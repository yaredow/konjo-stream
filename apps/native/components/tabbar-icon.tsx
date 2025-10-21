import { HugeiconsIcon } from "@hugeicons/react-native";

export const TabBarIcon = ({
  icon,
  color,
  size = 24,
}: {
  icon: any;
  color: string;
  size?: number;
}) => {
  return (
    <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={1.5} />
  );
};
