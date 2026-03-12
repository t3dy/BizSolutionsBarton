export interface CrewMember {
  id: string;
  name: string;
  role: 'lead' | 'mover' | 'driver';
}

export interface Crew {
  id: string;
  name: string;
  truck: string;
  members: CrewMember[];
  color: string;
}

export interface ScheduledJob {
  id: string;
  crewId: string;
  leadId: string;
  customerName: string;
  origin: string;
  destination: string;
  date: string;
  startTime: string;
  endTime: string;
  homeSize: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export const crews: Crew[] = [
  {
    id: 'C-01',
    name: 'Alpha Crew',
    truck: 'Truck #1 — 26ft Box',
    color: '#3b82f6',
    members: [
      { id: 'M-01', name: 'Marcus Johnson', role: 'lead' },
      { id: 'M-02', name: 'Tyler Reed', role: 'mover' },
      { id: 'M-03', name: 'Jake Collins', role: 'driver' },
    ],
  },
  {
    id: 'C-02',
    name: 'Bravo Crew',
    truck: 'Truck #2 — 20ft Box',
    color: '#10b981',
    members: [
      { id: 'M-04', name: 'DeShawn Williams', role: 'lead' },
      { id: 'M-05', name: 'Carlos Mendez', role: 'mover' },
      { id: 'M-06', name: 'Brian Scott', role: 'driver' },
    ],
  },
  {
    id: 'C-03',
    name: 'Charlie Crew',
    truck: 'Truck #3 — 16ft Van',
    color: '#f59e0b',
    members: [
      { id: 'M-07', name: 'Kevin O\'Brien', role: 'lead' },
      { id: 'M-08', name: 'Andre Davis', role: 'mover' },
    ],
  },
];

export const scheduledJobs: ScheduledJob[] = [
  {
    id: 'J-01',
    crewId: 'C-01',
    leadId: 'L-1003',
    customerName: 'Maria Rodriguez',
    origin: '3300 Bee Cave Rd',
    destination: '1800 Congress Ave',
    date: '2026-03-22',
    startTime: '08:00',
    endTime: '13:00',
    homeSize: '2 Bedroom',
    status: 'scheduled',
  },
  {
    id: 'J-02',
    crewId: 'C-02',
    leadId: 'L-1010',
    customerName: 'Chris Nguyen',
    origin: '500 W Oltorf St',
    destination: '9200 N Lamar Blvd',
    date: '2026-03-20',
    startTime: '09:00',
    endTime: '12:00',
    homeSize: '1 Bedroom',
    status: 'scheduled',
  },
  {
    id: 'J-03',
    crewId: 'C-01',
    leadId: 'L-1007',
    customerName: 'Jessica Alvarez',
    origin: '1400 E Anderson Ln',
    destination: '8800 Burnet Rd',
    date: '2026-03-25',
    startTime: '08:00',
    endTime: '11:00',
    homeSize: '1 Bedroom',
    status: 'scheduled',
  },
  {
    id: 'J-04',
    crewId: 'C-03',
    leadId: 'L-1001',
    customerName: 'Sarah Mitchell',
    origin: '1205 Barton Springs Rd',
    destination: '4502 Mueller Blvd',
    date: '2026-03-28',
    startTime: '07:30',
    endTime: '15:00',
    homeSize: '3 Bedroom',
    status: 'scheduled',
  },
  {
    id: 'J-05',
    crewId: 'C-02',
    leadId: 'L-1005',
    customerName: 'Emily Watson',
    origin: '2200 S 1st St',
    destination: '900 E 51st St',
    date: '2026-03-30',
    startTime: '09:00',
    endTime: '14:00',
    homeSize: '2 Bedroom',
    status: 'scheduled',
  },
  {
    id: 'J-06',
    crewId: 'C-01',
    leadId: 'L-1006',
    customerName: 'Robert Kim',
    origin: '5500 Balcones Dr',
    destination: '3200 Exposition Blvd',
    date: '2026-04-01',
    startTime: '08:00',
    endTime: '14:30',
    homeSize: '3 Bedroom',
    status: 'scheduled',
  },
];
