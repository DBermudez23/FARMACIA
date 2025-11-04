import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface SafeScreenProps {
    children: ReactNode;
    style?: ViewStyle;
}