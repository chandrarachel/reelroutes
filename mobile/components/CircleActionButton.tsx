import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface CircleButtonProps {
  icon: LucideIcon;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  textColor?: string;
  disabled?: boolean;
}

export const CircleActionButton: React.FC<CircleButtonProps> = ({
  icon: Icon,
  title,
  onPress,
  size = 56,
  backgroundColor = '#D1CEC5',
  iconColor = '#423d32',
  textColor = '#000000',
  disabled = false,
}) => {
  const buttonStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: disabled ? '#CCCCCC' : backgroundColor,
  };

  const iconSize = size * 0.5; // Icon size relative to button size

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Icon size={iconSize} color={iconColor} strokeWidth={1.5}/>
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor, fontSize: 12, maxWidth: size }]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 80,
  },
});