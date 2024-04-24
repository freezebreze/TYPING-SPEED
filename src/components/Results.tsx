import { motion } from "framer-motion"
import { formatPercentage } from "../utils/helps";
interface ResultsProps {
    error : number,
    accuracyPercentage : number,
    total : number,
    state : string,
    className  ?: string
}
const initial= {opacity: 0};
const animate = {opacity: 1};
const duration = {duration: 0.3};


const Results = ({error, accuracyPercentage, total,state, className,} : ResultsProps) => {
    if (state != 'finish') return null;
    return (
        <motion.ul className={` flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
            <motion.li initial = {initial} animate = {animate} transition={{...duration, delay: 0}} >Results</motion.li>
            <motion.li initial = {initial} animate = {animate} transition={{...duration, delay: 0.5}}>Accuracy: {formatPercentage(accuracyPercentage)}</motion.li>
            <motion.li initial = {initial} animate = {animate} transition={{...duration, delay: 1}} className="text-red-500 ">Error: {error}</motion.li>
            <motion.li initial = {initial} animate = {animate} transition={{...duration, delay: 1.4}}>Typed {total}</motion.li>
        </motion.ul>
    )
}

export default Results