const arr = [
    "868274066905029",
    "867018065072906",
    "861564061425628",
    "867018065667648",
    "867018065583837",
    "866824060241904",
    "866824066333168",
    "868274067368946",
    "867018064981511",
    "868274066918709"
    ]

const qvery = [
     {
       $match: {
        imei: { $in: [
            "868274066905029",
            "867018065072906",
            "861564061425628",
            "867018065667648",
            "867018065583837",
            "866824060241904",
            "866824066333168",
            "868274067368946",
            "867018064981511",
            "868274066918709"
            ] },
       },
     },
     {
        $lookup: {
          from: 'fotaBatchDevices', // Name of the second collection
          localField: 'imei',
          foreignField: 'deviceImei',
          as: 'fotaDevices',
        },
      },
      {
        $unwind: '$fotaDevices', // Unwind the array
      },
      {
        $sort: {
          'fotaDevices.createdAt': -1, // Sort by createdAt in descending order (latest first)
        },
      },
      {
        $group: {
          _id: '$_id',
          fotaDevices: { $first: '$fotaDevices' }, // Take the first (latest) document
        },
      },
]