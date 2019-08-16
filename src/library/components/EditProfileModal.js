import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import WhiteButton from 'library/components/UI/WhiteButton';
import EditProfessionModal from 'library/components/EditProfessionModal';

const EditProfileModal = ({ modalVisible, setModalVisible }) => {
  const [profilePic, setProfilePic] = useState(
    'https://res.cloudinary.com/cwhit/image/upload/v1554496137/sickfits/bnv8g9tra0urzouy2dmn.jpg'
  );
  const [bannerPic, setBannerPic] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [profession, setProfession] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);
  const [schoolHistory, setSchoolHistory] = useState([]);
  const [proModalVisible, setProModalVisible] = useState(false);

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <EditProfessionModal
        proModalVisible={proModalVisible}
        setProModalVisible={setProModalVisible}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        profession={profession}
        setProfession={setProfession}
        industry={industry}
        setIndustry={setIndustry}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <TextButton textStyle={styles.closeButtonText} onPress={() => setModalVisible(false)}>
              Close
            </TextButton>
            <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>
              Edit Profile
            </Text>
            <TextButton textStyle={styles.saveButtonText} onPress={() => null}>
              Save
            </TextButton>
          </View>
          <View style={styles.profileBox}>
            <View style={styles.profilePicView}>
              <Image style={styles.profilePic} resizeMode="cover" source={{ uri: profilePic }} />
            </View>
            <WhiteButton buttonStyle={{ marginBottom: 10 }} onPress={() => null}>
              Edit Pic
            </WhiteButton>
            <WhiteButton buttonStyle={{}} onPress={() => null}>
              Edit Banner
            </WhiteButton>
          </View>
          <View style={styles.section}>
            <Text style={{ ...defaultStyles.largeThin, ...styles.sectionTitle }}>
              Personal Info
            </Text>

            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Name</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setName(val)}
                value={name}
                placeholder="Add your name"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Profession</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity
                  onPress={() => setProModalVisible(true)}
                  style={styles.touchableRow}
                >
                  {jobTitle ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{jobTitle}</Text>
                  ) : (
                    <Text style={{ ...defaultStyles.defaultMute }}>Select your profession</Text>
                  )}
                  <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Location</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={() => null}
                value={null}
                placeholder="Add your location"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Website</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInputNoBorder, ...defaultStyles.defaultText }}
                autoCapitalize={false}
                onChangeText={() => null}
                value={null}
                placeholder="Add your website"
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={{ ...defaultStyles.largeThin, ...styles.sectionTitle }}>Bio</Text>
            <TextInput
              style={{ ...styles.multilineInput, ...defaultStyles.defaultText }}
              onChangeText={() => null}
              value={null}
              multiline
              placeholder="Start your bio"
            />
          </View>
          <View style={styles.section}>
            <Text style={{ ...defaultStyles.largeThin, ...styles.sectionTitle }}>Skills</Text>
            <View style={styles.skillRow}>
              <TextInput
                style={styles.skillInput}
                onChangeText={() => null}
                value={null}
                placeholder="Add a new skill"
              />
              <TextButton textStyle={styles.addButton} onPress={() => null}>
                Add
              </TextButton>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    width: 60,
    textAlign: 'left',
  },
  saveButtonText: {
    width: 60,
    textAlign: 'right',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
  },
  profileBox: {
    backgroundColor: colors.purp,
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePicView: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 0.2,
    borderTopColor: colors.darkGray,
  },
  sectionTitle: {
    width: '100%',
    paddingBottom: 15,
    color: colors.purp,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    width: 100,
  },
  rowInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
  },
  rowInputNoBorder: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
  largeInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
  },
  multilineInput: {
    width: '100%',
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillInput: {
    width: '70%',
  },
  addButton: {
    fontSize: 14,
  },
});
