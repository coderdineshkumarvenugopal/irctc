export const mockTrains = [
    {
      number: '12951',
      name: 'Mumbai Rajdhani',
      departureStation: 'New Delhi (NDLS)',
      departure: '16:25',
      arrivalStation: 'Mumbai Central (MMCT)',
      arrival: '08:15',
      duration: '15h 50m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'SL': 1200,
        '3A': 2500,
        '2A': 3500,
        '1A': 6000
      },
      availableClasses: ['SL', '3A', '2A', '1A'],
      availability: [
        { date: 'Today', status: 'Available 125' },
        { date: 'Tomorrow', status: 'Available 89' },
        { date: 'Sat, 10 Jun', status: 'WL 14' }
      ],
      type: 'RAJDHANI'
    },
    {
      number: '12952',
      name: 'New Delhi Rajdhani',
      departureStation: 'Mumbai Central (MMCT)',
      departure: '17:40',
      arrivalStation: 'New Delhi (NDLS)',
      arrival: '08:35',
      duration: '14h 55m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'SL': 1200,
        '3A': 2500,
        '2A': 3500,
        '1A': 6000
      },
      availableClasses: ['SL', '3A', '2A', '1A'],
      availability: [
        { date: 'Today', status: 'WL 5' },
        { date: 'Tomorrow', status: 'RAC 12' },
        { date: 'Sat, 10 Jun', status: 'Available 45' }
      ],
      type: 'RAJDHANI'
    },
    {
      number: '12301',
      name: 'Howrah Rajdhani',
      departureStation: 'New Delhi (NDLS)',
      departure: '16:55',
      arrivalStation: 'Howrah Junction (HWH)',
      arrival: '09:55',
      duration: '17h 00m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'SL': 1100,
        '3A': 2400,
        '2A': 3400,
        '1A': 5800
      },
      availableClasses: ['SL', '3A', '2A', '1A'],
      availability: [
        { date: 'Today', status: 'Available 56' },
        { date: 'Tomorrow', status: 'Available 32' },
        { date: 'Sat, 10 Jun', status: 'Available 18' }
      ],
      type: 'RAJDHANI'
    },
    {
      number: '12306',
      name: 'Howrah-New Delhi Rajdhani',
      departureStation: 'Howrah Junction (HWH)',
      departure: '16:10',
      arrivalStation: 'New Delhi (NDLS)',
      arrival: '10:50',
      duration: '18h 40m',
      runningDays: ['Mon', 'Wed', 'Fri', 'Sun'],
      fare: {
        'SL': 1100,
        '3A': 2400,
        '2A': 3400,
        '1A': 5800
      },
      availableClasses: ['SL', '3A', '2A', '1A'],
      availability: [
        { date: 'Today', status: 'RAC 3' },
        { date: 'Tomorrow', status: 'WL 12' },
        { date: 'Sat, 10 Jun', status: 'Available 26' }
      ],
      type: 'RAJDHANI'
    },
    {
      number: '12957',
      name: 'Swarna Jayanti Rajdhani Express',
      departureStation: 'New Delhi (NDLS)',
      departure: '18:35',
      arrivalStation: 'Ahmedabad Junction (ADI)',
      arrival: '05:45',
      duration: '11h 10m',
      runningDays: ['Mon', 'Wed', 'Fri'],
      fare: {
        'SL': 950,
        '3A': 2100,
        '2A': 3000,
        '1A': 5200
      },
      availableClasses: ['SL', '3A', '2A', '1A'],
      availability: [
        { date: 'Today', status: 'Available 42' },
        { date: 'Tomorrow', status: 'Available 29' },
        { date: 'Sat, 10 Jun', status: 'RAC 6' }
      ],
      type: 'RAJDHANI'
    },
    {
      number: '12001',
      name: 'Bhopal Shatabdi',
      departureStation: 'New Delhi (NDLS)',
      departure: '06:15',
      arrivalStation: 'Bhopal (BPL)',
      arrival: '13:35',
      duration: '7h 20m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'CC': 1650,
        'EC': 3125
      },
      availableClasses: ['CC', 'EC'],
      availability: [
        { date: 'Today', status: 'Regret' },
        { date: 'Tomorrow', status: 'Available 137' },
        { date: 'Sat, 10 Jun', status: 'Available 89' }
      ],
      type: 'SHATABDI'
    },
    {
      number: '12002',
      name: 'New Delhi Shatabdi',
      departureStation: 'Bhopal (BPL)',
      departure: '15:00',
      arrivalStation: 'New Delhi (NDLS)',
      arrival: '22:10',
      duration: '7h 10m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'CC': 1650,
        'EC': 3125
      },
      availableClasses: ['CC', 'EC'],
      availability: [
        { date: 'Today', status: 'Available 65' },
        { date: 'Tomorrow', status: 'Available 108' },
        { date: 'Sat, 10 Jun', status: 'Available 72' }
      ],
      type: 'SHATABDI'
    },
    {
      number: '12046',
      name: 'Chandigarh Shatabdi',
      departureStation: 'New Delhi (NDLS)',
      departure: '12:00',
      arrivalStation: 'Chandigarh (CDG)',
      arrival: '15:25',
      duration: '3h 25m',
      runningDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      fare: {
        'CC': 1255,
        'EC': 2345
      },
      availableClasses: ['CC', 'EC'],
      availability: [
        { date: 'Today', status: 'Available 122' },
        { date: 'Tomorrow', status: 'Available 88' },
        { date: 'Sat, 10 Jun', status: 'Available 65' }
      ],
      type: 'SHATABDI'
    }
  ];