import React from "react";
import { motion } from "framer-motion";

type Props = {};

const FeatureCard = ({
  title,
  description,
  icon,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col items-center p-5 rounded-xl glass card-gradient"
  >
    <div className="p-3 rounded-full bg-swift-purple/10 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-swift-purple">{title}</h3>
    <p className="text-sm text-center text-muted-foreground">{description}</p>
  </motion.div>
);

export default FeatureCard;
