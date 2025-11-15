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
  size = 80,
  backgroundColor = '#007AFF',
  iconColor = '#FFFFFF',
  textColor = '#000000',
  disabled = false,
}) => {
  const buttonStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: disabled ? '#CCCCCC' : backgroundColor,
  };

  const iconSize = size * 0.4; // Icon size relative to button size

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Icon size={iconSize} color={iconColor} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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