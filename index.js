"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Data loading methods (mocked)
const loadSummaryData = () => __awaiter(void 0, void 0, void 0, function* () {
    return {
        userId: "1234567890",
        activityId: 9480958402,
        activityName: "Indoor Cycling",
        durationInSeconds: 3667,
        startTimeInSeconds: 1661158927,
        startTimeOffsetInSeconds: 7200,
        activityType: "INDOOR_CYCLING",
        averageHeartRateInBeatsPerMinute: 150,
        activeKilocalories: 561,
        deviceName: "instinct2",
        maxHeartRateInBeatsPerMinute: 190
    };
});
const loadLapsData = () => __awaiter(void 0, void 0, void 0, function* () {
    return [
        {
            startTimeInSeconds: 1661158927,
            airTemperatureCelsius: 28,
            heartRate: 109,
            totalDistanceInMeters: 15,
            timerDurationInSeconds: 600
        },
        {
            startTimeInSeconds: 1661158929,
            airTemperatureCelsius: 28,
            heartRate: 107,
            totalDistanceInMeters: 30,
            timerDurationInSeconds: 900
        }
    ];
});
const loadSamplesData = () => __awaiter(void 0, void 0, void 0, function* () {
    return [
        { "recording-rate": 5, "sample-type": "0", data: "86,87,88,88,88,90,91" },
        { "recording-rate": 5, "sample-type": "2", data: "120,126,122,140,142,155,145" },
        { "recording-rate": 5, "sample-type": "2", data: "141,147,155,160,180,152,120" },
        { "recording-rate": 5, "sample-type": "0", data: "86,87,88,88,88,90,91" },
        { "recording-rate": 5, "sample-type": "1", data: "143,87,88,88,88,90,91" },
        { "recording-rate": 5, "sample-type": "2", data: "143,151,164,null,173,181,180" },
        { "recording-rate": 5, "sample-type": "2", data: "182,170,188,181,174,172,158" }
    ];
});
// Process heart rate samples for a lap
const processHeartRateSamples = (samples) => {
    let heartRateSamples = [];
    samples.forEach((sample, sampleIndex) => {
        if (sample["sample-type"] === "2") {
            const dataPoints = sample.data.split(',').map((value) => (value === "null" ? null : Number(value)));
            dataPoints.forEach((heartRate, index) => {
                heartRateSamples.push({ index: sampleIndex * dataPoints.length + index, heartRate });
            });
        }
    });
    return heartRateSamples;
};
// Consolidate all data
const consolidateData = () => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield loadSummaryData();
    const laps = yield loadLapsData();
    const samples = yield loadSamplesData();
    const lapsData = laps.map((lap) => {
        const heartRateSamples = processHeartRateSamples(samples);
        return {
            startTimeInSeconds: lap.startTimeInSeconds,
            distanceInMeters: lap.totalDistanceInMeters,
            durationInSeconds: lap.timerDurationInSeconds,
            heartRateSamples
        };
    });
    return {
        activityOverview: summary,
        lapsData
    };
});
// Output as JSON
const generateFinalJSON = () => __awaiter(void 0, void 0, void 0, function* () {
    const unifiedData = yield consolidateData();
    console.log(JSON.stringify(unifiedData, null, 2));
});
// Execute
generateFinalJSON();
