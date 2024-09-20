type Summary = {
	userId: string;
	activityId: number;
	activityName: string;
	durationInSeconds: number;
	startTimeInSeconds: number;
	startTimeOffsetInSeconds: number;
	activityType: string;
	averageHeartRateInBeatsPerMinute: number;
	activeKilocalories: number;
	deviceName: string;
	maxHeartRateInBeatsPerMinute: number;
  };
  
  type Lap = {
	startTimeInSeconds: number;
	airTemperatureCelsius: number;
	heartRate: number;
	totalDistanceInMeters: number;
	timerDurationInSeconds: number;
  };
  
  type Sample = {
	"recording-rate": number;
	"sample-type": string;
	data: string;
  };
  
  type UnifiedJSON = {
	activityOverview: Summary;
	lapsData: {
	  startTimeInSeconds: number;
	  distanceInMeters: number;
	  durationInSeconds: number;
	  heartRateSamples: Array<{ index: number; heartRate: number | null }>;
	}[];
  };
  
  // Data loading methods (mocked)
  const loadSummaryData = async (): Promise<Summary> => {
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
  };
  
  const loadLapsData = async (): Promise<Lap[]> => {
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
  };
  
  const loadSamplesData = async (): Promise<Sample[]> => {
	return [
	  { "recording-rate": 5, "sample-type": "0", data: "86,87,88,88,88,90,91" },
	  { "recording-rate": 5, "sample-type": "2", data: "120,126,122,140,142,155,145" },
	  { "recording-rate": 5, "sample-type": "2", data: "141,147,155,160,180,152,120" },
	  { "recording-rate": 5, "sample-type": "0", data: "86,87,88,88,88,90,91" },
	  { "recording-rate": 5, "sample-type": "1", data: "143,87,88,88,88,90,91" },
	  { "recording-rate": 5, "sample-type": "2", data: "143,151,164,null,173,181,180" },
	  { "recording-rate": 5, "sample-type": "2", data: "182,170,188,181,174,172,158" }
	];
  };
  
  // Process heart rate samples for a lap
  const processHeartRateSamples = (samples: Sample[]): Array<{ index: number; heartRate: number | null }> => {
	let heartRateSamples: Array<{ index: number; heartRate: number | null }> = [];
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
  const consolidateData = async (): Promise<UnifiedJSON> => {
	const summary = await loadSummaryData();
	const laps = await loadLapsData();
	const samples = await loadSamplesData();
  
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
  };
  
  // Output as JSON
  const generateFinalJSON = async () => {
	const unifiedData = await consolidateData();
	console.log(JSON.stringify(unifiedData, null, 2));
  };
  
  // Execute
  generateFinalJSON();