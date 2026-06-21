import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Team headshot imports (safely matching the generated assets)
import BhaskarImg from '../assets/images/bhaskar_founder_1781962220615.jpg';
import VijayaImg from '../assets/images/vijaya_director_1781962235658.jpg';
import JagadishImg from '../assets/images/jagadish_technical_1781962254865.jpg';
import SwathiImg from '../assets/images/swathi_mtech_1781962268336.jpg';
import PrakashImg from '../assets/images/prakash_aerospace_1781962282383.jpg';
import UdayImg from '../assets/images/uday_bhaskar_systems_1781962300819.jpg';
import CharyImg from '../assets/images/chary_manufacturing_1781962316656.jpg';

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  credentials: string;
  image: string;
  summary: string;
  highlights: string[];
  bio: string[];
}

interface TeamGalleryProps {
  onSelectMember: (member: TeamMember) => void;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Mr. Bhaskar",
    title: "Founder & Managing Director",
    credentials: "B.Tech Mechanical Engineering | 19 Years Experience",
    image: BhaskarImg,
    summary: "19 years of professional engineering experience, including 16 years at Hindustan Aeronautics Limited (HAL) and 3 years as an Assistant Professor.",
    highlights: [
      "16 years of service at Hindustan Aeronautics Limited (HAL)",
      "Expertise in customer service, manufacturing, quality assurance, design & vendor development",
      "Passionate founder dedicating solutions to aerospace, mechanical, and electronic sectors"
    ],
    bio: [
      "A B.Tech Mechanical Engineer with 19 years of professional experience, including 16 years at Hindustan Aeronautics Limited (HAL) and 3 years as an Assistant Professor. Experienced in customer service, manufacturing operations, quality assurance, design support, and vendor development.",
      "Passionate about engineering excellence and innovation, he founded Hasanth Engineering to deliver reliable mechanical, electrical, electronics, and engineering solutions with a strong focus on quality, customer satisfaction, and technical expertise."
    ]
  },
  {
    id: 2,
    name: "Mrs. Vijaya Kumari",
    title: "Director of Operations & Administration",
    credentials: "M.Tech in Power Systems",
    image: VijayaImg,
    summary: "Directs business operations, strategic growth, preschool management and administrative compliance at Hasanth Engineering.",
    highlights: [
      "Master of Technology (M.Tech) in Power Systems",
      "Orchestrates client coordination, strategic scaling, and operations center administration",
      "Passionate leader overseeing multi-sector educational & technical facilities"
    ],
    bio: [
      "Mrs. Vijaya Kumari holds a Master of Technology (M.Tech) in Power Systems and brings strong technical knowledge along with exceptional leadership and management skills.",
      "As the Director of Operations & Administration at Hasanth Engineering, she plays a key role in overseeing business operations, strategic planning, client coordination, and organizational development. Her ability to combine engineering expertise with effective management contributes significantly to the company's growth and success.",
      "In addition to her responsibilities at Hasanth Engineering, Mrs. Vijaya Kumari also manages a preschool, demonstrating her passion for education, leadership, and community development. Her experience in both technical and educational sectors reflects her versatile professional capabilities and commitment to excellence.",
      "With a vision to build innovative and sustainable organizations, Mrs. Vijaya Kumari continues to guide teams, streamline operations, and foster a culture of continuous improvement and professional growth."
    ]
  },
  {
    id: 3,
    name: "Mr. Jagadish",
    title: "Director of Technology (R&D)",
    credentials: "M.Tech in Embedded Systems & FPGA",
    image: JagadishImg,
    summary: "Sensory hardware specialist and aerospace-grade embedded systems developer holding multiple technology patents.",
    highlights: [
      "Over 18 years of experience in hardware design and FPGA processing frameworks",
      "Technical lead for defense-grade, aerospace, IoT, and automated sensing platforms",
      "Inventive system designer associated with multiple engineering patents"
    ],
    bio: [
      "Jagadish is an Embedded Systems and R&D leader with over 18 years of experience in hardware design, FPGA systems, industrial electronics, and defence-grade product development.",
      "He leads technology initiatives at Hasanth Engineering Ltd., focusing on innovative embedded, IoT, data acquisition, and automation solutions for aerospace, defence, industrial, and research sectors.",
      "He is also associated with multiple patents in electronics and sensing technologies."
    ]
  },
  {
    id: 4,
    name: "Mr. Prakash",
    title: "Senior Aerospace Design Consultant",
    credentials: "B.Tech Mechanical Engineering | 17+ Years Experience",
    image: PrakashImg,
    summary: "17+ years in Aerospace OEM, structure engineering, Catia V5 design, and aircraft cabin installations.",
    highlights: [
      "Worked with major customers like Boeing, Airbus, National Aerospace Labs, and HAL",
      "Expertise in fighter aircraft structures, cockpit modules, and wiring harnesses",
      "Mastery of modern software suites: CATIA V5, ENOVIA VPM, Team Center, and PDM systems"
    ],
    bio: [
      "An outstanding engineering professional with over 17+ years of experience in Aerospace OEM, Engineering Services, Tool design and Production Industries & holding a Bachelors degree in Mechanical engineering.",
      "In the aerospace industry, he has designed and executed aircraft structures, cabin interiors, electrical harness layouts, composite solutions, aircraft cockpit structures, and Line-Replaceable Unit (LRU) installations for frontline fighter aircraft.",
      "Throughout his career, he has successfully delivered on programs for premium names, including Otto Bilz, John Crane Sealing Systems, Boeing, Airbus GmbH, Diehl Aircabin GmbH, Labinal GmbH, National Aerospace Laboratories, and Hindustan Aeronautics Ltd."
    ]
  },
  {
    id: 5,
    name: "Ms. Swathi Kakulla",
    title: "CAD/CAM Developer & Project Coordinator",
    credentials: "M.Tech in CAD/CAM",
    image: SwathiImg,
    summary: "Directs vendor interactions, CAD/CAM educational programs, and project milestones mapping.",
    highlights: [
      "Master of Technology (M.Tech) in CAD/CAM Design & Automation",
      "Bridge coordinator for vendor management, project execution plans, and institutional support",
      "Brings powerful organizing and problem-solving to Hasanth's daily expansion goals"
    ],
    bio: [
      "Ms. Swathi Kakulla is a highly dedicated engineering professional with an M.Tech degree specializing in CAD/CAM (Computer-Aided Design and Computer-Aided Manufacturing). She has gained valuable academic and professional experience through her association with engineering institutions in Hyderabad, where she contributed to technical education and engineering development activities.",
      "Currently, she is associated with Hasanth Engineering, where she plays a crucial role in the organization's growth and operations. Her key responsibilities include vendor development, project coordination, administration, and business support functions. Through her strong technical knowledge, organizational skills, and effective communication, she has been instrumental in establishing and maintaining relationships with vendors, supporting project execution, and ensuring smooth administrative operations.",
      "Her commitment, leadership qualities, and problem-solving approach make her a valuable asset to Hasanth Engineering, contributing significantly to the company's success and expansion initiatives."
    ]
  },
  {
    id: 6,
    name: "Mr. Uday Bhaskar",
    title: "Senior Systems & Instrumentation Engineer",
    credentials: "B.Tech Electronics & Communication",
    image: UdayImg,
    summary: "Oversees high-resolution sensor interfaces, telemetry signals validation, and data logging calibration setups.",
    highlights: [
      "Specialist in real-time telemetry pipelines and avionics data acquisition calibration",
      "Manages signal diagnostic environments and system validation workflows",
      "Integrates rigorous EKF filter states and PID controller debug checks"
    ],
    bio: [
      "Uday Bhaskar is a Senior Instrumentation and electronic system verification expert with a focus on data acquisition channels and telemetry.",
      "He leads critical laboratory calibrations and diagnostics setups to establish high-fidelity sensing feeds for aerospace, defense, and industrial testing rigs.",
      "His strong expertise in interface protocol layers and hardware-software integration supports the company's seamless hardware rollout programs."
    ]
  },
  {
    id: 7,
    name: "Mr. Chary",
    title: "Senior Precision Machining Consultant",
    credentials: "Specialist in Tooling & CNC Operations",
    image: CharyImg,
    summary: "Aviation-grade fixture construction, dynamic toolpath optimization, and metallurgic auditing leader.",
    highlights: [
      "Expert in multi-axis CNC milling setups and dynamic cutting tool calibrations",
      "Oversees sub-micron mechanical tolerance auditing for critical components",
      "Maintains highest level of metal finish and geometry stability under stress forces"
    ],
    bio: [
      "Chary possesses extensive industrial experience in tooling engineering, fixture design, and advanced aerospace-grade manufacturing.",
      "He oversees the mechanical machining floor, focusing on translating CATIA designs into highly optimized physical parts with exact micron-level accuracy.",
      "His deep engineering support guarantees IPC/aeronautical compliance for structures and structural fixtures."
    ]
  }
];

export function TeamGallery({ onSelectMember }: TeamGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset initial styles prior to transition to avoid flash/jumpiness
    const cards = el.querySelectorAll('.member-card');
    gsap.set(cards, { opacity: 0, y: 50 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      },
      onLeaveBack: () => {
        // Reset state for beautiful replay upon scrolling up and back down
        gsap.to(cards, {
          opacity: 0,
          y: 50,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      id="team-gallery-container"
    >
      {teamMembers.map((member) => (
        <div key={member.id} className="member-card opacity-0">
          <InteractiveCard className="h-full flex flex-col justify-between p-5 bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-3xl hover:border-[#002b5c]/10 hover:scale-[1.02] hover:z-10">
            <div className="space-y-5 relative z-10">
              {/* Photo Headshot frame */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img 
                  src={member.image} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-sans font-black text-[#002b5c] leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#002b5c] font-sans text-[10px] font-black uppercase tracking-wider">
                  {member.title}
                </p>
                <p className="text-slate-500 font-sans text-[10.5px] font-semibold tracking-wide leading-tight pt-1">
                  {member.credentials}
                </p>
              </div>

              <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed font-sans line-clamp-3">
                {member.summary}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => onSelectMember(member)}
                className="inline-flex items-center gap-1.5 text-[10.5px] font-sans font-extrabold uppercase text-[#002b5c] tracking-wider hover:text-blue-700 cursor-pointer transition-colors"
                id={`read-bio-btn-${member.id}`}
              >
                <span>Read Profile</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </InteractiveCard>
        </div>
      ))}
    </div>
  );
}
