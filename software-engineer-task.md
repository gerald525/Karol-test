You are tasked with developing a library that processes data from professional athletes' sports computers. The objective is to create a library capable of loading three types of input data, each through a separate method, and then processing this data. The final output should be a unified JSON file that consolidates all three datasets, which will then be used by the science team for further analysis.

### Data Set Characteristics:

- Summary: A basic activity summary including type, average values, etc.
- Laps: Detailed descriptions of laps, including time, distance, and duration.
- Samples: A collection of detailed recorded values grouped by sample types.

### Output JSON Requirements:

**The resulting JSON should include the following:**

- Activity Overview: Key details such as userId, type, device, max heart rate, and duration.
- Laps Data: For each lap, include start time, distance, duration, and detailed heart rate samples. Heart rate samples should be presented as an array of objects containing two keys: sample index and heart rate.

**Sample Processing Guidelines:**

- Heart rate samples are identified as type 2.
- For each lap of type INDOOR_CYCLING, there are two consecutive objects of samples in the samples array.

###  Technical Requirements:

- Implement your solution using one of the following general-purpose programming languages: Java, Kotlin, C#, Python, JavaScript, or TypeScript. JavaScript or TypeScript is preferred.
- Ensure that your solution achieves at least 80% test coverage.
- We value both enterprise-level robustness and simplicity in your code, so please strive to balance these aspects.
- Submit your solution by pushing it to a Git repository and sharing the link with us.

### Bonus points:

Your goal is to design, implement, test and document a methodology for pre-processing and modelling of the heart rate measurements within a lap. The pre-processing part should cover outlier identification and cleaning. The initial recording rate is set to `5`, whereas each observation is a median aggregate of the 5 tick heart rate measurments. You need to reverse the aggregation step and backward interpolate the observations in a way, that you end up with 5 * (n-1) heart rate measurements with the corresponding recording rate of `1`, where n denotes the initial number of observations. The modelling part should cover both model training and testing steps. The model should do well with predicting the median of the next five consecutive heart rate tick values. Elaborate on the error metric you chose for the model validation.

**Summary**
```json
  {
  "userId": "1234567890",
  "activityId": 9480958402,
  "activityName": "Indoor Cycling",
  "durationInSeconds": 3667,
  "startTimeInSeconds": 1661158927,
  "startTimeOffsetInSeconds": 7200,
  "activityType": "INDOOR_CYCLING",
  "averageHeartRateInBeatsPerMinute": 150,
  "activeKilocalories": 561,
  "deviceName": "instinct2",
  "maxHeartRateInBeatsPerMinute": 190
}
```

**Samples data**
```json
[
  {
    "recording-rate": 5,
    "sample-type": "0",
    "data": "86,87,88,88,88,90,91"
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    "data": "120,126,122,140,142,155,145"
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    "data": "141,147,155,160,180,152,120"
  },
  {
    "recording-rate": 5,
    "sample-type": "0",
    "data": "86,87,88,88,88,90,91"
  },
  {
    "recording-rate": 5,
    "sample-type": "1",
    "data": "143,87,88,88,88,90,91"
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    "data": "143,151,164,null,173,181,180"
  },
  {
    "recording-rate": 5,
    "sample-type": "2",
    "data": "182,170,188,181,174,172,158"
  }
    {
    "recording-rate": 5,
    "sample-type": "3",
    "data": "143,87,88,88,88,90,91"
  },
]


```

**Laps**
```json
 [
  {
    "startTimeInSeconds": 1661158927,
    "airTemperatureCelsius": 28,
    "heartRate": 109,
    "totalDistanceInMeters": 15,
    "timerDurationInSeconds": 600
  },
  {
    "startTimeInSeconds": 1661158929,
    "airTemperatureCelsius": 28,
    "heartRate": 107,
    "totalDistanceInMeters": 30,
    "timerDurationInSeconds": 900
  }
]
```