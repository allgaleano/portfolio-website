import { SiAstro, SiGnubash, SiMongodb, SiOracle, SiSpring, SiSpringboot, SiVite } from "react-icons/si";
import { Badge } from "./ui/badge";
import { useEffect, useRef } from "react";
import { RiJavaLine, RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { TbBrandMysql } from "react-icons/tb";
import { DiRedis } from "react-icons/di";
import { FaAws, FaDocker, FaGitAlt, FaGithub, FaGitlab, FaReact } from "react-icons/fa";
import { PiLinuxLogoFill } from "react-icons/pi";

const techList = [
  { name: 'Java', icon: <RiJavaLine/> },
  { name: 'Spring', icon: <SiSpring /> },
  { name: 'Spring Boot', icon: <SiSpringboot />},
  { name: 'PostgreSQL', icon: <BiLogoPostgresql /> },
  { name: 'MySQL', icon: <TbBrandMysql /> },
  { name: 'OracleSQL', icon: <SiOracle /> },
  { name: 'Redis', icon: <DiRedis /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'GitHub', icon: <FaGithub /> },
  { name: 'GitLab', icon: <FaGitlab /> },
  { name: 'Linux', icon: <PiLinuxLogoFill /> },
  { name: 'Bash', icon: <SiGnubash />},
  { name: 'JavaScript', icon: <RiJavascriptFill /> },
  { name: 'TypeScript', icon: <BiLogoTypescript /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <RiNextjsFill /> },
  { name: 'Vite', icon: <SiVite /> },
  { name: 'Astro', icon: <SiAstro /> }
];

export default function TechBadges() {

  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Inject keyframes into the document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes techBadgeScroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .tech-badges-scroll {
        animation: techBadgeScroll 40s linear infinite;
      }
      
      .tech-badges-scroll:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const duplicatedTechList = [...techList, ...techList];
  
  return (
    <div className="relative overflow-hidden mt-4 py-2">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-1 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-1 pointer-events-none" />
      
      {/* Scrolling container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 tech-badges-scroll"
        style={{ width: 'max-content' }}
      >
        {duplicatedTechList.map((tech, index) => (
          <Badge 
            key={`${tech.name}-${index}`} 
            variant="outline" 
            className="text-lg gap-2 flex-shrink-0 whitespace-nowrap hover:bg-primary/10 hover:border-primary transition-colors"
          >
            <span className="text-lg">
              {tech.icon}
            </span>
            {tech.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
