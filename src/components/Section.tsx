import { motion } from "framer-motion";
import { ReactNode, forwardRef, memo } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section = memo(forwardRef<HTMLElement, SectionProps>(({ children, className = "", id }, ref) => (
  <motion.section
    ref={ref}
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`section-padding ${className}`}
  >
    <div className="container mx-auto">{children}</div>
  </motion.section>
)));

Section.displayName = "Section";

export default Section;
