import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import CustomDialog from '../com/dialog/CustomDialog';
import { PortalProvider } from '@tamagui/portal';
import { TamaguiProvider } from '@tamagui/core';
import tamaguiConfig from 'mobile/tamagui.config';
// import { Button } from 'tamagui';
import AppDialog from '../com/dialog/AppDialog';
const Dailogexmaple = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <View style={styles.container}>
          <Text style={styles.title}>Dialog Examples</Text>

          <Button
            title="Open Default Dialog"
            onPress={() => setDialogOpen(true)}
          />

          <CustomDialog
            isOpen={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Dialog Title"
            description="This is a description of the dialog content."
            type="success"
            size="large"
            showIcon={true}
            showActions={true}
            primaryActionLabel="Confirm"
            secondaryActionLabel="Cancel"
            onPrimaryAction={() => {
              console.log('Primary action clicked');
              setDialogOpen(false);
            }}
            onSecondaryAction={() => {
              console.log('Secondary action clicked');
              setDialogOpen(false);
            }}
            backgroundColor="#000"
            borderRadius={12}
            padding={24}
            closeOnOverlayPress={true}
            showCloseButton={true}
            animation="medium"
            
          >
            <View style={styles.dialogContent}>
              <Text style={styles.contentText}>
                This is additional content inside the dialog. You can put any
                React components here.
              </Text>
            </View>
          </CustomDialog>
        </View> */}
      <Button title="Open Dialog" onPress={() => setOpen(true)} />

      <AppDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete Account"
        message="Are you sure you want to delete your account?"
        onConfirm={() => console.log('Confirmed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  dialogContent: {
    paddingVertical: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

export default Dailogexmaple;
