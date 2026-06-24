import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, Sparkles, Wrench, Shield, Binary, 
  Blocks, Settings, Microscope, Hammer, Cpu 
} from 'lucide-react';
import { InteractiveCard } from './InteractiveCard';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TeamMember {
  id: number;
  name: string;
  title: string;
  credentials: string;
  summary: string;
  highlights: string[];
  bio: string[];
  icon?: any;
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
    icon: Wrench,
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
    icon: Shield,
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
    icon: Binary,
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
    title: "Chief Designer",
    credentials: "B.Tech Mechanical Engineering | 17+ Years Experience",
    icon: Blocks,
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
    title: "Chief Technical Administration",
    credentials: "M.Tech in CAD/CAM",
    icon: Settings,
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
    name: "Dr. S. Uday Bhaskar",
    title: "General Manager (Technical)",
    credentials: "P.hD - Mechanical Engineering",
    icon: Microscope,
    summary: "Oversees high-resolution sensor interfaces, telemetry signals validation, and data logging calibration setups.",
    highlights: [
      "Specialist in real-time telemetry pipelines and avionics data acquisition calibration",
      "Manages signal diagnostic environments and system validation workflows",
      "Integrates rigorous EKF filter states and PID controller debug checks"
    ],
    bio: [
      "Dr. S. Uday Bhaskar is a Senior Instrumentation and electronic system verification expert with a focus on data acquisition channels and telemetry.",
      "He leads critical laboratory calibrations and diagnostics setups to establish high-fidelity sensing feeds for aerospace, defense, and industrial testing rigs.",
      "His strong expertise in interface protocol layers and hardware-software integration supports the company's seamless hardware rollout programs."
    ]
  },
  {
    id: 7,
    name: "Mr. Chary",
    title: "Chief Manager (Shop Floor)",
    credentials: "Specialist in Tooling & CNC Operations",
    icon: Hammer,
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

    const cards = el.querySelectorAll('.member-card');
    gsap.set(cards, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          overwrite: 'auto'
        });
      },
      onLeaveBack: () => {
        gsap.to(cards, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          overwrite: 'auto'
        });
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {teamMembers.map((member) => {
        const Icon = member.icon || Cpu;
        return (
          <div key={member.id} className="member-card opacity-0 group">
            <InteractiveCard className="h-full flex flex-col justify-between p-6 bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#002b5c]/20 transition-all duration-500 rounded-[2rem] hover:scale-[1.02] relative overflow-hidden">
              {/* Decorative Watermark Icon */}
              <div className="absolute -top-4 -right-4 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
                <Icon size={140} strokeWidth={1} />
              </div>

              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  {/* Styled Icon Badge */}
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-[#002b5c]/5 group-hover:border-[#002b5c]/10 transition-colors">
                    <Icon size={18} className="text-[#002b5c]/70 group-hover:text-[#002b5c]" />
                  </div>
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#002b5c]/20" />
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-sans font-black text-[#002b5c] leading-none tracking-tight group-hover:tracking-normal transition-all">
                    {member.name}
                  </h3>
                  <p className="text-[#2563eb] font-sans text-[10px] font-black uppercase tracking-[0.15em]">
                    {member.title}
                  </p>
                  <p className="text-slate-400 font-mono text-[9px] font-bold tracking-tight pt-1">
                    {member.credentials}
                  </p>
                </div>

                <div className="h-px w-8 bg-slate-100 group-hover:w-full transition-all duration-700" />

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed font-sans line-clamp-3">
                  {member.summary}
                </p>
              </div>

              <div className="mt-6 pt-5 flex items-center justify-between relative z-10">
                <button 
                  onClick={() => onSelectMember(member)}
                  className="inline-flex items-center gap-2 text-[10px] font-sans font-black uppercase text-[#002b5c] tracking-widest hover:gap-3 transition-all cursor-pointer group/btn"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </InteractiveCard>
          </div>
        );
      })}
    </div>
  );
}
