import React, { ReactNode } from 'react';
import { Sheet, YStack, XStack, Button, Text, Input, ScrollView } from 'tamagui';
import { X } from '@tamagui/lucide-icons';


export interface CustomSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  
  // Customization props
  size?: 'small' | 'medium' | 'large' | 'full';
  snapPoints?: number[];
  defaultSnapPoint?: number;
  
  // Header options
  showHeader?: boolean;
  showCloseButton?: boolean;
  headerComponent?: ReactNode;
  
  // Footer options
  showFooter?: boolean;
  footerComponent?: ReactNode;
  showActionButtons?: boolean;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  
  // Style props
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  
  // Animation
  animation?: 'quick' | 'medium' | 'slow';
  dismissOnOverlayPress?: boolean;
  disableDrag?: boolean;
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  
  // Default values
  size = 'medium',
  snapPoints = [85, 50, 25],
  defaultSnapPoint = 0,
  
  // Header defaults
  showHeader = true,
  showCloseButton = true,
  headerComponent,
  
  // Footer defaults
  showFooter = false,
  footerComponent,
  showActionButtons = false,
  primaryActionLabel = 'Save',
  secondaryActionLabel = 'Cancel',
  onPrimaryAction,
  onSecondaryAction,
  
  // Style defaults
  backgroundColor = '$background',
  borderRadius = 20,
  padding = 20,
  
  // Animation defaults
  animation = 'medium',
  dismissOnOverlayPress = true,
  disableDrag = false,
}) => {
  // Map size to sheet dimensions
  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return { width: '40%', height: '40%' };
      case 'medium':
        return { width: '70%', height: '70%' };
      case 'large':
        return { width: '90%', height: '85%' };
      case 'full':
        return { width: '100%', height: '100%' };
      default:
        return { width: '70%', height: '70%' };
    }
  };


  // Map animation to duration
  const getAnimationConfig = () => {
    switch (animation) {
      case 'quick':
        return { type: 'spring', duration: 150 };
      case 'medium':
        return { type: 'spring', duration: 300 };
      case 'slow':
        return { type: 'spring', duration: 500 };
      default:
        return { type: 'spring' };
    }
  };

  const sizeProps = getSizeProps();

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      defaultSnapPoint={defaultSnapPoint}
      dismissOnSnapToBottom
      dismissOnOverlayPress={dismissOnOverlayPress}
      animation={getAnimationConfig()}
      zIndex={100000}
    >
      <Sheet.Overlay 
        animation={getAnimationConfig()}
        backgroundColor="rgba(0,0,0,0.6)"
      />
      
      <Sheet.Handle 
        backgroundColor="$gray6" 
        marginVertical={10}
        opacity={disableDrag ? 0 : 1}
      />
      
      <Sheet.Frame
        backgroundColor={backgroundColor}
        borderTopLeftRadius={borderRadius}
        borderTopRightRadius={borderRadius}
        padding={padding}
        {...sizeProps}
      >
        {showHeader && (
          <YStack marginBottom={20}>
            {headerComponent ? (
              headerComponent
            ) : (
              <XStack justifyContent="space-between" alignItems="center">
                <YStack flex={1}>
                  {title && (
                    <Text fontSize={24} fontWeight="bold" color="$text">
                      {title}
                    </Text>
                  )}
                  {description && (
                    <Text fontSize={14} color="$gray10" marginTop={4}>
                      {description}
                    </Text>
                  )}
                </YStack>
                
                {showCloseButton && (
                  <Button
                    circular
                    size="$3"
                    backgroundColor="transparent"
                    onPress={() => onOpenChange(false)}
                    pressStyle={{ backgroundColor: '$gray3' }}
                  >
                    <X size={20} color="$gray10" />
                  </Button>
                )}
              </XStack>
            )}
          </YStack>
        )}

        <ScrollView
          flex={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {showFooter && (
          <YStack marginTop={20} paddingTop={20} borderTopWidth={1} borderTopColor="$gray4">
            {footerComponent ? (
              footerComponent
            ) : showActionButtons ? (
              <XStack gap={12} justifyContent="flex-end">
                {secondaryActionLabel && onSecondaryAction && (
                  <Button
                    backgroundColor="transparent"
                    borderColor="$gray6"
                    borderWidth={1}
                    color="$gray12"
                    onPress={onSecondaryAction}
                    flex={1}
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
                {primaryActionLabel && onPrimaryAction && (
                  <Button
                    backgroundColor="$primary"
                    color="$white"
                    onPress={onPrimaryAction}
                    flex={1}
                  >
                    {primaryActionLabel}
                  </Button>
                )}
              </XStack>
            ) : null}
          </YStack>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};

export default CustomSheet;