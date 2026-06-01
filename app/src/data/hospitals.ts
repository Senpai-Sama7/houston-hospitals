export interface Highlight {
  icon: string;
  label: string;
  desc: string;
}

export interface AmenityGroups {
  rooms: string[];
  technology: string[];
  facilities: string[];
  services: string[];
  luxury: string[];
}

export type HospitalType = "General" | "Cancer" | "Rehabilitation" | "Pediatric" | "Trauma";
export type ERLevel = "Level I" | "Level II" | "None";

export interface Hospital {
  id: number;
  name: string;
  shortName: string;
  grade: string;
  txRank: string;
  nationalStatus: string;
  color: string;
  glow: string;
  accent: string;
  location: string;
  coordinates: { lat: number; lng: number };
  founded: number;
  beds: number;
  campuses: number;
  overallScore: number;
  heroTag: string;
  image: string;
  amenityScore: number;
  techScore: number;
  luxuryScore: number;
  careScore: number;
  tags: string[];
  specialties: string[];
  amenities: AmenityGroups;
  highlights: Highlight[];
  source: string;
  website: string;
  phone: string;
  type: HospitalType;
  erLevel: ERLevel;
}

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Houston Methodist Hospital",
    shortName: "Methodist",
    grade: "S",
    txRank: "#1 Texas · 14x Honor Roll",
    nationalStatus: "National Honor Roll · Top 20 USA",
    color: "#C8960C",
    glow: "rgba(200, 150, 12, 0.4)",
    accent: "rgba(200, 150, 12, 0.05)",
    location: "6565 Fannin St, Texas Medical Center",
    coordinates: { lat: 29.7076, lng: -95.4018 },
    founded: 1919,
    beds: 926,
    campuses: 9,
    overallScore: 99,
    heroTag: "HONOR ROLL · TOP 20 IN USA",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    amenityScore: 98,
    techScore: 99,
    luxuryScore: 92,
    careScore: 99,
    tags: ["Honor Roll", "AI Smart Rooms", "Robotics", "Surgical", "TMC", "International", "Research"],
    specialties: ["Cardiology", "Neurology", "Oncology", "Orthopedics", "Transplant", "General Surgery"],
    amenities: {
      rooms: [
        "Private rooms with AI-enabled ambient intelligence sensors for fall prevention",
        "Voice-controlled room environment (TV, dynamic lighting, smart thermostat)",
        "Two-way high-definition audio/video virtual nursing interfaces in every suite",
        "Wireless fetal telemetry monitors in childbirth centers (unrestricted mobility)",
        "Camera-assisted remote discharge processing systems"
      ],
      technology: [
        "da Vinci 5 Surgical Systems deployed at Flagship & Cypress campuses",
        "MITIE — one of the largest surgical training and preclinical research centers globally",
        "Multi-axis hybrid operating suites for complex structural heart interventions",
        "Enterprise-wide AI-powered clinical surveillance and real-time deterioration alerts",
        "3D mammography and advanced diagnostic imaging",
        "Acute Care Telenurse (ACTN) system — avg call 13 min vs 45 min traditional"
      ],
      facilities: [
        "105-acre Cypress campus ($685M capital investment, opened March 2025)",
        "Eileen Murphree McMillin Blood Donor Center (Fondren Building)",
        "On-site clinical-grade pharmacy and 24/7 interfaith spiritual sanctuaries",
        "Dedicated international patient reception suites",
        "9-hospital network across greater Houston"
      ],
      services: [
        "24/7 visitor access paradigms with biometric guest verification",
        "Integrated global patient logistics with dedicated medical translation teams",
        "6 localized Centers of Excellence spanning neurosciences, orthopedics, and oncology",
        "Dedicated financial navigators and inpatient bedside medication delivery",
        "Chaplaincy and integrative medicine programs"
      ],
      luxury: [
        "Walter Tower renovated executive-level patient suites with premium finishes",
        "Custom room-service culinary menus curated by executive chefs",
        "Personal inpatient concierge and guest relations coordinators",
        "Hotel-grade private room furnishings systemwide",
        "Family accommodation options for long-term stays"
      ]
    },
    highlights: [
      { icon: "🤖", label: "da Vinci 5", desc: "Next-gen robotic platform with force feedback technology" },
      { icon: "🧠", label: "AI Smart Rooms", desc: "Computer-vision safety integration and ambient sensing" },
      { icon: "🏗️", label: "Cypress Campus", desc: "State-of-the-art $685M facility opened March 2025" },
      { icon: "🔬", label: "MITIE Center", desc: "Global hub for advanced microsurgical education" }
    ],
    source: "U.S. News 2025-2026 | HoustonMethodist.org | Community Impact Mar 2025",
    website: "https://www.houstonmethodist.org",
    phone: "(713) 790-3311",
    type: "General",
    erLevel: "Level II"
  },
  {
    id: 2,
    name: "UT MD Anderson Cancer Center",
    shortName: "MD Anderson",
    grade: "S",
    txRank: "#1 Cancer USA · Consecutive Era",
    nationalStatus: "#1 Ranked Cancer Hospital in the United States",
    color: "#C0392B",
    glow: "rgba(192, 57, 43, 0.4)",
    accent: "rgba(192, 57, 43, 0.05)",
    location: "1515 Holcombe Blvd, Texas Medical Center",
    coordinates: { lat: 29.7073, lng: -95.3974 },
    founded: 1941,
    beds: 700,
    campuses: 6,
    overallScore: 99,
    heroTag: "#1 CANCER CENTER IN THE WORLD",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    amenityScore: 96,
    techScore: 99,
    luxuryScore: 95,
    careScore: 100,
    tags: ["Oncology", "Clinical Trials", "International", "Proton Therapy", "TMC", "Research", "Cancer"],
    specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology", "Hematology", "Immunotherapy", "Proton Therapy"],
    amenities: {
      rooms: [
        "Highly specialized HEPA-filtered positive pressure oncology suites",
        "Integrated Rotary House International accommodations connected via skywalk",
        "Rotary House Executive Wing: 7 premium suites featuring business amenities",
        "ADA-compliant barrier-free clinical suites with zero-threshold roll-in showers",
        "All rooms wheelchair and medical equipment accessible"
      ],
      technology: [
        "World's largest phase I-III oncology clinical trial program",
        "Active-scanning proton therapy with intensity-modulated delivery (IMPT)",
        "On-site deep genomic sequencing and real-time tumor board analysis",
        "Ultra-high-field intraoperative MRI for neuro-oncological precision",
        "$1.3 billion annual research investment (2024)",
        "Precision medicine and genomic sequencing for treatment planning"
      ],
      facilities: [
        "1.6 million sq. ft. Mays Clinic outpatient facility",
        "Dedicated clinical trials enrollment and screening centers",
        "Advanced radiation oncology pavilions with specialized vaults",
        "On-site patient advocacy and physical rehabilitation centers",
        "Rotary House International — hotel attached directly to hospital"
      ],
      services: [
        "Comprehensive international patient coordinators with visa support",
        "Dedicated nurse navigators assigned to every clinical pathway",
        "Direct airport-to-hospital private transit options for complex cases",
        "Integrated oncology social work, nutrition, and psycho-oncology teams",
        "Clinical trial matching service"
      ],
      luxury: [
        "Premium international concierge desk managing local luxury lodging",
        "VIP private entrances and secure egress pathways for public figures",
        "Access to dedicated upscale lounges with high-speed secure networks",
        "Rotary House Executive Wing: 7 rooms with luxury furnishings and city views",
        "Dedicated concierge for international patients"
      ]
    },
    highlights: [
      { icon: "🏨", label: "Rotary House", desc: "Physically integrated full-service hospital hotel" },
      { icon: "🧬", label: "Trial Access", desc: "Unmatched pipeline of first-in-human therapies" },
      { icon: "✈️", label: "Airport Shuttles", desc: "Direct logistical links to Hobby (HOU) and IAH" },
      { icon: "🌍", label: "Global Concierge", desc: "End-to-end support for international families" }
    ],
    source: "U.S. News 2025-2026 | MDAnderson.org | Texas Legislature HR-52 (2025)",
    website: "https://www.mdanderson.org",
    phone: "(877) 632-6789",
    type: "Cancer",
    erLevel: "None"
  },
  {
    id: 3,
    name: "TIRR Memorial Hermann",
    shortName: "TIRR",
    grade: "A+",
    txRank: "#2 Rehab USA · Historic Continuity",
    nationalStatus: "National Leader in Rehabilitation Medicine",
    color: "#1565C0",
    glow: "rgba(21, 101, 192, 0.4)",
    accent: "rgba(21, 101, 192, 0.05)",
    location: "1333 Moursund St, Texas Medical Center",
    coordinates: { lat: 29.7128, lng: -95.3996 },
    founded: 1950,
    beds: 134,
    campuses: 1,
    overallScore: 91,
    heroTag: "#2 REHAB USA · RANKED SINCE 1989",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    amenityScore: 88,
    techScore: 93,
    luxuryScore: 78,
    careScore: 97,
    tags: ["Rehabilitation", "Robotics", "Neurology", "TMC", "Specialty", "Research", "Federal Center"],
    specialties: ["Physical Rehabilitation", "Neurological Rehabilitation", "Spinal Cord Injury", "Brain Injury", "Stroke Recovery", "Pediatric Rehab"],
    amenities: {
      rooms: [
        "Specialized patient rooms utilizing integrated overhead lift tracking systems",
        "Environmental control interfaces optimized for adaptive switch inputs",
        "Family-integrated living units to simulate transitional post-discharge care",
        "Wheelchair-accessible bathrooms with modern high-flow clinical drainage",
        "Gym and rehabilitation spaces accessible from patient floors"
      ],
      technology: [
        "Advanced exoskeletal robotic gait systems (EksoGT, ReWalk, Indego)",
        "High-fidelity virtual reality platforms for neuro-cognitive retraining",
        "Computer-assisted functional electrical stimulation (FES) cycles",
        "Locomotor training systems with body-weight support treadmills",
        "Brain Injury Model System — federally designated research center",
        "Dedicated neuroimaging and assessment technology"
      ],
      facilities: [
        "State-of-the-art rehabilitation gymnasium with biomechanical feedback",
        "Fully functional simulated apartment for adaptive daily living trials",
        "Therapeutic indoor pool featuring adjustable depths and hydraulic lifts",
        "TIRR Brain Injury Research Center and SCI clinical trials lab",
        "On-site pharmacy and medical supply"
      ],
      services: [
        "Comprehensive community re-integration programs including driving trials",
        "Integrated vocational rehabilitation and back-to-work counseling",
        "Specialized peer-to-peer mentorship and family support networks",
        "Interdisciplinary neuropsychology and cognitive health teams",
        "Comprehensive case management from admission to discharge"
      ],
      luxury: [
        "Inpatient-to-outpatient care continuity models",
        "Highly specialized clinical nurse-to-patient staffing ratios",
        "Access to advanced clinical research protocols on spinal and brain injuries",
        "Specialty hospital — intimate and patient-focused setting",
        "Research-backed protocols — patients benefit from ongoing clinical research"
      ]
    },
    highlights: [
      { icon: "🦾", label: "Exo-Robotics", desc: "Clinically integrated robotic gait trainers" },
      { icon: "🏠", label: "Simulated Suite", desc: "Adaptive daily living trial micro-apartment" },
      { icon: "📜", label: "Rank Legacy", desc: "Top national rank held continuously since 1989" },
      { icon: "🧪", label: "National Center", desc: "Federally designated Rehab Innovation Center" }
    ],
    source: "U.S. News 2025-2026 | MemorialHermann.org | TIRR Memorial Hermann (Oct 2025)",
    website: "https://tirr.memorialhermann.org",
    phone: "(713) 797-5942",
    type: "Rehabilitation",
    erLevel: "None"
  },
  {
    id: 4,
    name: "Baylor St. Luke's Medical Center",
    shortName: "St. Luke's",
    grade: "A",
    txRank: "#2 Houston · #4 Texas",
    nationalStatus: "National Leader in Cardiology & Heart Surgery",
    color: "#2E7D32",
    glow: "rgba(46, 125, 50, 0.4)",
    accent: "rgba(46, 125, 50, 0.05)",
    location: "6720 Bertner Ave, Texas Medical Center",
    coordinates: { lat: 29.6956, lng: -95.3930 },
    founded: 1954,
    beds: 881,
    campuses: 2,
    overallScore: 86,
    heroTag: "HOME OF THE TEXAS HEART INSTITUTE",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    amenityScore: 91,
    techScore: 90,
    luxuryScore: 96,
    careScore: 88,
    tags: ["Cardiology", "Transplant", "Luxury", "TMC", "Magnet", "Heart", "Surgical"],
    specialties: ["Cardiology", "Heart Surgery", "Transplant", "Oncology", "Orthopedics", "Neurosciences"],
    amenities: {
      rooms: [
        "Panoramic Terrace Suites located on the 23rd floor with skyline views",
        "Spacious custom rooms with integrated workstation zones for families",
        "Low-ratio private suites with fully upgraded room finishes",
        "In-room automated medication dispensing and charting integration",
        "Standard private inpatient rooms throughout 881-bed hospital"
      ],
      technology: [
        "First successful clinical implantation of BiVACOR Total Artificial Heart (2024)",
        "Advanced high-precision robotic cardiothoracic surgery programs",
        "Intraoperative structural heart imaging labs and hybrid endovascular suites",
        "Integrated electronic health record connectivity with Baylor College of Medicine",
        "World's first artificial heart implantation performed here",
        "First laser angioplasty procedure performed here"
      ],
      facilities: [
        "Recently expanded state-of-the-art McNair Campus inpatient tower",
        "O'Quinn Medical Tower housing the Dan L Duncan Comprehensive Cancer Center",
        "30-bed high-tech inpatient rehabilitation center reopened at McNair in 2025",
        "Dedicated Texas Heart Institute cardiovascular research facility",
        "Three community emergency centers in Greater Houston"
      ],
      services: [
        "Cardiovascular triage and rapid-access chest pain centers",
        "Complex multi-organ transplant coordination teams",
        "Comprehensive structural heart program support coordinators",
        "Language assistance available",
        "Personalized patient guidance throughout stay"
      ],
      luxury: [
        "Terrace Suites: dedicated executive culinary service and concierge staff",
        "VIP clinical nursing wing with dedicated visitor controls",
        "5-time Magnet Designation for exemplary nursing standards",
        "Panoramic views of the Texas Medical Center and Houston skyline",
        "Fine hotel-caliber furnishings and personalized concierge nursing"
      ]
    },
    highlights: [
      { icon: "🌆", label: "Terrace Suites", desc: "Luxury 23rd-floor clinical suites with skyline views" },
      { icon: "❤️", label: "THI Legacy", desc: "Home of pioneering cardiac surgery and device firsts" },
      { icon: "🏗️", label: "McNair Tower", desc: "Advanced operational expansion completed in 2025" },
      { icon: "🏅", label: "Magnet x5", desc: "Rare quintuple Magnet Nursing Excellence status" }
    ],
    source: "U.S. News 2025-2026 | CommonSpirit.org | Baylor Medicine 2025 | Woodlands Online Jan 2025",
    website: "https://www.baylorstluke.com",
    phone: "(713) 526-4243",
    type: "General",
    erLevel: "Level II"
  },
  {
    id: 5,
    name: "Memorial Hermann–TMC",
    shortName: "MH TMC",
    grade: "A",
    txRank: "#4 Houston · #6 Texas",
    nationalStatus: "Level I Adult & Pediatric Trauma Center",
    color: "#6A1B9A",
    glow: "rgba(106, 27, 154, 0.4)",
    accent: "rgba(106, 27, 154, 0.05)",
    location: "6411 Fannin St, Texas Medical Center",
    coordinates: { lat: 29.7105, lng: -95.3998 },
    founded: 1925,
    beds: 1104,
    campuses: 3,
    overallScore: 81,
    heroTag: "LEVEL I TRAUMA · LIFE FLIGHT",
    image: "https://images.unsplash.com/photo-1502740479091-635887520276?auto=format&fit=crop&q=80&w=800",
    amenityScore: 87,
    techScore: 88,
    luxuryScore: 80,
    careScore: 87,
    tags: ["Trauma I", "Pediatrics", "Aviation", "TMC", "Retail", "Emergency", "Level I"],
    specialties: ["Trauma Surgery", "Emergency Medicine", "Pediatrics", "Orthopedics", "Neurosurgery", "OB/GYN"],
    amenities: {
      rooms: [
        "State-of-the-art pediatric rooms at Children's Memorial Hermann",
        "Inpatient rooms with dedicated telemetry and variable-level care capabilities",
        "Custom room services offering specialized dietary programs",
        "Integrated medical gas systems and emergency overhead access interfaces",
        "Private and semi-private inpatient rooms at 1,104-bed flagship campus"
      ],
      technology: [
        "Red Duke Trauma Institute: one of the busiest Level I trauma centers in the nation",
        "Memorial Hermann Life Flight: advanced critical care air ambulance fleet",
        "Comprehensive interventional stroke suite with flat-panel biplane imaging",
        "Advanced pediatric ECMO and neonatal life support capabilities",
        "Advanced cardiac cath labs and interventional cardiology"
      ],
      facilities: [
        "30-story Medical Plaza connected directly via climatized skybridge",
        "On-campus helipad optimized for multi-aircraft trauma operations",
        "Children's Memorial Hermann Hospital: fully integrated dedicated pediatric facility",
        "Integrated physical therapy, outpatient dialysis, and diagnostics hubs",
        "Starbucks and Walgreens Pharmacy accessible via interior skybridge"
      ],
      services: [
        "Rapid air-medical transport coordination (Life Flight dispatch)",
        "Comprehensive level I pediatric and adult trauma reception pathways",
        "Integrated outpatient pharmacy services available via skybridge",
        "Dedicated transition-of-care coordinators for complex post-acute needs",
        "Concierge Services: hotel/restaurant recommendations, navigation"
      ],
      luxury: [
        "Dedicated international and VIP coordination services",
        "Skybridge retail plaza integration with premium cafes and services",
        "VIP parking configurations with dedicated hospital escorts",
        "Valet parking at main Fannin entrance",
        "Concierge team offering city guides, hotel & restaurant recommendations"
      ]
    },
    highlights: [
      { icon: "🚁", label: "Life Flight", desc: "Pioneering critical care air ambulance program" },
      { icon: "☕", label: "Skybridge Plaza", desc: "Direct indoor climate-controlled retail and dining access" },
      { icon: "🚨", label: "Level I Trauma", desc: "State-of-the-art Red Duke Adult & Pediatric Trauma Institute" },
      { icon: "👶", label: "Children's Campus", desc: "Integrated comprehensive pediatric clinical hospital" }
    ],
    source: "U.S. News 2025-2026 | MemorialHermann.org | LoopNet TMC 2025 | Yelp Reviews",
    website: "https://www.memorialhermann.org",
    phone: "(713) 704-1000",
    type: "Trauma",
    erLevel: "Level I"
  },
  {
    id: 6,
    name: "Memorial Hermann Greater Heights",
    shortName: "MH Heights",
    grade: "A",
    txRank: "#3 Houston · #5 Texas",
    nationalStatus: "Multi-campus Metro Network",
    color: "#E65100",
    glow: "rgba(230, 81, 0, 0.4)",
    accent: "rgba(230, 81, 0, 0.05)",
    location: "1635 N Loop W, Greater Heights (+ 4 campuses)",
    coordinates: { lat: 29.8041, lng: -95.4256 },
    founded: 1907,
    beds: 430,
    campuses: 5,
    overallScore: 83,
    heroTag: "#3 HOUSTON METRO · 5-CAMPUS NETWORK",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800",
    amenityScore: 82,
    techScore: 83,
    luxuryScore: 76,
    careScore: 85,
    tags: ["Multi-campus", "Community", "Network", "Rehabilitation", "Orthopedics", "Regional"],
    specialties: ["General Medicine", "Orthopedics", "Rehabilitation", "Women's Health", "Cancer Care", "Cardiology"],
    amenities: {
      rooms: [
        "Private rooms at Greater Heights flagship campus",
        "Room service meal orders by phone or bedside, delivery within 45 minutes",
        "Kosher and Muslim dietary accommodations available on request",
        "Neonatal ICU dedicated wing at system campuses",
        "Accessible rooms for mobility-impaired patients"
      ],
      technology: [
        "Nationally ranked Rehabilitation program (#50 USA)",
        "Memorial Hermann | Rockets Orthopedic Hospital (TMC campus)",
        "Advanced imaging and outpatient diagnostics across all campuses",
        "Comprehensive women's health and OB/GYN services",
        "Cancer care services systemwide",
        "Cardiac monitoring and interventional cardiology"
      ],
      facilities: [
        "5-campus network across Houston metro (Heights, Woodlands, Pearland, SE, SW)",
        "The Woodlands Café (daily 7am-6:30pm)",
        "Café-on-the-Go convenience store (credit cards only)",
        "Valet parking available at multiple campuses",
        "Connection to Memorial Hermann Health System network of 13 hospitals"
      ],
      services: [
        "Memorial Hermann Health System — 13 hospitals total across Houston",
        "Home health and hospice post-discharge continuum",
        "Sleep medicine program",
        "Rehabilitation network for outpatient continuity",
        "Financial counseling and charity care programs"
      ],
      luxury: [
        "5-campus network means specialist access wherever you are in Houston",
        "The Woodlands campus has a resort-area feel (suburban medical campus)",
        "Room service meals on demand — 45-minute delivery",
        "Ranked #5 in all of Texas — broad community access to quality care",
        "Memorial Hermann Life Flight network access across all campuses"
      ]
    },
    highlights: [
      { icon: "🗺️", label: "5-Campus Network", desc: "Heights, Woodlands, Pearland, SE, SW — Houston covered" },
      { icon: "🍽️", label: "Room Service", desc: "Phone or bedside order, delivered in 45 minutes" },
      { icon: "🕌", label: "Dietary Options", desc: "Kosher and Muslim meals available on request" },
      { icon: "🏥", label: "13-Hospital System", desc: "Part of the largest hospital system in Houston" }
    ],
    source: "U.S. News 2025-2026 | MemorialHermann.org Patient Guides | Press Release Jul 29 2025",
    website: "https://www.memorialhermann.org/locations/greater-heights",
    phone: "(713) 867-2000",
    type: "General",
    erLevel: "Level II"
  },
  {
    id: 7,
    name: "Texas Children's Hospital",
    shortName: "Texas Children's",
    grade: "S",
    txRank: "#3 Children's · USA",
    nationalStatus: "#1 Pediatric Cardiology · #3 Children's Hospital Nationally",
    color: "#0066CC",
    glow: "rgba(0, 102, 204, 0.4)",
    accent: "rgba(0, 102, 204, 0.05)",
    location: "6621 Fannin St, Texas Medical Center",
    coordinates: { lat: 29.7075, lng: -95.4012 },
    founded: 1954,
    beds: 973,
    campuses: 4,
    overallScore: 97,
    heroTag: "#1 PEDIATRIC CARDIOLOGY · #3 NATIONALLY",
    image: "https://images.unsplash.com/photo-1588776814212-d968506f0ce1?auto=format&fit=crop&q=80&w=800",
    amenityScore: 95,
    techScore: 97,
    luxuryScore: 90,
    careScore: 98,
    tags: ["Pediatrics", "Cardiology", "Neonatology", "Fetal Surgery", "TMC", "Research"],
    specialties: ["Pediatric Cardiology", "Neonatology", "Neurology", "Hematology", "GI", "Pulmonology"],
    amenities: {
      rooms: [
        "Bright, child-friendly patient rooms with interactive entertainment systems",
        "Family sleep accommodations in every patient room (parent cot or sofa bed)",
        "Private NICU suites with dedicated family space and lactation support areas",
        "Teen lounges and age-appropriate activity rooms across all floors",
        "Healing garden and outdoor play areas accessible from patient floors"
      ],
      technology: [
        "Fetal Center with advanced intrauterine surgery capabilities",
        "World's first successful separation of conjoined twins in multiple procedures",
        "Pediatric ECMO program — one of the largest and most experienced in the nation",
        "Robotic-assisted pediatric surgery program (da Vinci Xi systems)",
        "Advanced pediatric cardiac catheterization and hybrid suites",
        "Most Wired designation for outstanding healthcare-based technology"
      ],
      facilities: [
        "4-campus network: TMC Main, West Campus, The Woodlands, Austin",
        "Jan and Dan Duncan Neurological Research Institute",
        "Feigin Center — pediatric research tower",
        "Pediatric intensive care units (PICU, CVICU, NICU) with dedicated teams",
        "On-site school program for long-term patients (HISD partnership)",
        "Ronald McDonald House Houston on campus",
        "Multiple playrooms, art studios, and music therapy spaces",
        "Chapel and interfaith spiritual care center"
      ],
      services: [
        "24/7 pediatric emergency center",
        "International patient services with multilingual coordinators",
        "Child Life specialists on every patient floor",
        "Social work and family support services embedded in care teams",
        "Patient and family education programs",
        "Pediatric transport team (ground and air)",
        "MyChart patient portal for families",
        "Financial counseling and charity care programs"
      ],
      luxury: [
        "On-site school program allowing children to continue education during treatment",
        "Ronald McDonald House Houston — 70-bedroom family accommodation on campus",
        "Healing garden, outdoor play areas, and interactive art installations",
        "Room service dining with pediatric nutritionist-designed menus",
        "Music therapy, art therapy, and pet therapy programs",
        "Valet parking and family concierge services"
      ]
    },
    highlights: [
      { icon: "👶", label: "#1 Pediatric Cardiology", desc: "Nationally ranked #1 for pediatric cardiology and heart surgery" },
      { icon: "🏥", label: "973-Bed Children's Campus", desc: "Largest children's hospital in the nation by bed count" },
      { icon: "🧬", label: "Fetal Surgery Center", desc: "Advanced intrauterine surgery capabilities — world's firsts" },
      { icon: "🏫", label: "On-Site School", desc: "HISD partnership allows patients to continue education during treatment" }
    ],
    source: "U.S. News 2025-2026 | TexasChildrens.org | Newsweek 2025",
    website: "https://www.texaschildrens.org",
    phone: "(832) 824-1000",
    type: "Pediatric",
    erLevel: "Level II"
  },
  {
    id: 8,
    name: "Ben Taub Hospital",
    shortName: "Ben Taub",
    grade: "B+",
    txRank: "Top Trauma · Houston",
    nationalStatus: "Level I Trauma Center · Ginni & Richard Mithoff Trauma Center",
    color: "#D84315",
    glow: "rgba(216, 67, 21, 0.4)",
    accent: "rgba(216, 67, 21, 0.05)",
    location: "1504 Taub Loop, Texas Medical Center",
    coordinates: { lat: 29.7108, lng: -95.3965 },
    founded: 1963,
    beds: 582,
    campuses: 1,
    overallScore: 76,
    heroTag: "LEVEL I TRAUMA · 3 DECADES OF SERVICE",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd1439e7e0?auto=format&fit=crop&q=80&w=800",
    amenityScore: 72,
    techScore: 78,
    luxuryScore: 60,
    careScore: 85,
    tags: ["Trauma", "Public Hospital", "Level I", "Burn Care", "Stroke", "Teaching"],
    specialties: ["Trauma", "Burn Care", "Stroke", "Psychiatry", "Emergency Medicine"],
    amenities: {
      rooms: [
        "Standard private and semi-private inpatient rooms across 582-bed campus",
        "Dedicated trauma bays with immediate surgical intervention capability",
        "Comprehensive Stroke Center with specialized monitoring rooms",
        "Burn unit with specialized wound care suites",
        "Behavioral health inpatient unit"
      ],
      technology: [
        "Ginni and Richard Mithoff Trauma Center — Level I Comprehensive facility",
        "Advanced trauma imaging suite (CT, MRI, X-ray within the trauma center)",
        "Comprehensive Stroke Center with rapid intervention capabilities",
        "Emergency Department handling 85,000+ visits annually",
        "Helipad for emergency medical air transport",
        "Advanced burn care technology and wound management systems"
      ],
      facilities: [
        "One of only two Level I Trauma Centers in the greater Houston area",
        "Re-verified as Level I Comprehensive Trauma Center (May 2025)",
        "On-site pharmacy and laboratory services",
        "Baylor College of Medicine primary teaching hospital",
        "Dedicated psychiatric emergency center",
        "Outpatient specialty clinics on campus",
        "On-site cafeteria and vending"
      ],
      services: [
        "24/7 Level I Trauma emergency services",
        "Harris Health System financial assistance and charity care programs",
        "Interpreter services available (multilingual staff)",
        "Social work and case management embedded in care teams",
        "Baylor College of Medicine physician staffing",
        "Patient transportation assistance programs",
        "Community health outreach programs"
      ],
      luxury: [
        "Public hospital mission — serves all patients regardless of ability to pay",
        "Teaching hospital affiliation with Baylor College of Medicine",
        "One of the most experienced trauma centers in the Gulf Coast region",
        "Nearly three decades of continuous Level I trauma verification",
        "Comprehensive care model with integrated specialty services on-site"
      ]
    },
    highlights: [
      { icon: "🚨", label: "Level I Trauma", desc: "One of only 2 Level I trauma centers in Houston — re-verified May 2025" },
      { icon: "🏥", label: "Public Hospital Mission", desc: "Serves all patients regardless of ability to pay — 85,000+ ER visits/year" },
      { icon: "🧠", label: "Comprehensive Stroke Center", desc: "Rapid stroke intervention capabilities with specialized monitoring" },
      { icon: "🎓", label: "Baylor Teaching Hospital", desc: "Primary teaching hospital for Baylor College of Medicine" }
    ],
    source: "U.S. News 2025-2026 | HarrisHealth.org | Click2Houston May 2025",
    website: "https://www.harrishealth.org",
    phone: "(713) 873-2000",
    type: "Trauma",
    erLevel: "Level I"
  }
];

export const METRICS = [
  { key: "overallScore", label: "Overall Rating" },
  { key: "careScore", label: "Clinical Quality" },
  { key: "techScore", label: "Tech Execution" },
  { key: "amenityScore", label: "Inpatient Amenity" },
  { key: "luxuryScore", label: "Luxury & VIP" }
] as const;

export type MetricKey = (typeof METRICS)[number]["key"];

export type SortKey = MetricKey | "beds" | "founded";

export const ALL_TAGS = Array.from(new Set(hospitals.flatMap((h) => h.tags))).sort();

export const SPECIALTIES = Array.from(new Set(hospitals.flatMap((h) => h.specialties))).sort();

export const GRADES = ["S", "A+", "A", "B+"] as const;

export const VIEW_TABS = [
  { id: "directory", label: "Directory", desc: "Browse all hospitals", icon: "Search" },
  { id: "compare", label: "Matrix", desc: "Side-by-side comparison", icon: "BarChart3" },
  { id: "analytics", label: "Analytics", desc: "Data visualization", icon: "TrendingUp" },
  { id: "luxury", label: "Luxury", desc: "Premium care ranking", icon: "Sparkles" },
  { id: "sources", label: "Sources", desc: "Data provenance", icon: "Info" }
] as const;

export type ViewKey = (typeof VIEW_TABS)[number]["id"];

export const QUICK_SCENARIOS = [
  { id: "cancer", label: "Cancer & Clinical Trials", icon: "🧬", tags: ["Cancer", "Research", "Oncology"] },
  { id: "heart", label: "Heart & Cardiac Surgery", icon: "❤️", tags: ["Heart", "Cardiology", "Surgical"] },
  { id: "rehab", label: "Rehabilitation & Neuro", icon: "🦾", tags: ["Rehabilitation", "Neurology"] },
  { id: "trauma", label: "Trauma & Emergency", icon: "🚨", tags: ["Trauma I", "Emergency", "Level I"] },
  { id: "luxury", label: "Luxury & VIP Care", icon: "✨", tags: ["Luxury", "VIP"] },
  { id: "international", label: "International Patients", icon: "🌍", tags: ["International", "Global"] },
  { id: "pediatric", label: "Pediatric Care", icon: "👶", tags: ["Pediatrics", "Pediatric Cardiology", "Neonatology"] },
  { id: "reset", label: "Reset All Filters", icon: "🔄", tags: [] }
] as const;

export const HOSPITAL_TYPES = ["All", "General", "Cancer", "Rehabilitation", "Pediatric", "Trauma"] as const;
export type HospitalTypeFilter = (typeof HOSPITAL_TYPES)[number];

export const ER_LEVELS = ["All", "Level I", "Level II", "None"] as const;
export type ERLevelFilter = (typeof ER_LEVELS)[number];

export const ALERTS = [
  "HOUSTON METHODIST: #1 IN TEXAS FOR 14TH CONSECUTIVE YEAR (2025-2026)",
  "MD ANDERSON: #1 CANCER HOSPITAL IN THE WORLD — 11 YEARS RUNNING",
  "TEXAS CHILDREN'S: ELEVATED TO #3 NATIONALLY, #1 PEDIATRIC CARDIOLOGY",
  "BAYLOR ST. LUKE'S TERRACE SUITES: 23RD FLOOR PANORAMIC VIEWS",
  "BEN TAUB: RE-VERIFIED LEVEL I TRAUMA CENTER (MAY 2025)",
  "MEMORIAL HERMANN TMC: LIFE FLIGHT AIR AMBULANCE FLEET",
  "TIRR: #2 REHAB USA — RANKED EVERY YEAR SINCE 1989",
  "HOUSTON METHODIST $685M CYPRESS CAMPUS OPENED MARCH 2025",
] as const;
