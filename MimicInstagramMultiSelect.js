import React, {useState} from 'react';
import { View, Image, Platform, Pressable, Text, TextInput, Switch, SafeAreaView } from 'react-native';

// Mimic Instagram's multi select textinput
const pronouns = [
  {
    id: 0,
    pronoun: 'she'
  },
  {
    id: 1,
    pronoun: 'her'
  },
  {
    id: 2,
    pronoun: 'he'
  },
  {
    id: 3,
    pronoun: 'him'
  },
  {
    id: 4,
    pronoun: 'they'
  },
  {
    id: 5,
    pronoun: 'them'
  },
]

const MimicInstagramMultiSelect = () => {
  const [pronoun, setPronoun] = useState(pronouns);
  const [filter, setFilter] = useState(pronouns);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const searchPronoun = (text) => {
    const regex = /^[^!-\/:-@\[-`{-~]+$/;
    setFilter(pronouns);
    if(regex.test(text)) {
      const newData = filter.filter((item) => {
        const itemData = item.pronoun ? item.pronoun.toLowerCase() : ''.toLocaleLowerCase()
        const textData = text.toLocaleLowerCase().trim();
        return itemData.indexOf(textData) > -1;
      });
      setPronoun(newData);
      setSearch(text.trim());
    } if(regex.test(text)) {
      const items = selected.filter((item) => item.pronoun !== text);
      setSelected(items);
      setSearch(text.trim());
    } else {
      setPronoun(filter);
      setSearch(text.trim());
    } 
  }

  const handleDelete = (itemId) => {
    const items = selected.filter((item) => item.id !== itemId);
    setSelected(items);
  };

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 20 }}>
        <Pressable>
            <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/close.png')} />
        </Pressable>
        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20, paddingLeft: 20 }}>Pronouns</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Pressable>
            <Image style={{ width: 25, height: 25 }} source={require('../assets/icons/checkmark.png')} />
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 20, backgroundColor: 'white' }}>
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            {selected.map((item) => (
              <SelectedItems item={item} key={item.id} onDelete={handleDelete} />
            ))}
            <TextInput
              placeholder={selected.length === 4 ? '' : 'Add your pronouns'}
              keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
              value={search.toLowerCase().trim()}
              style={{ flex: 1 }}
              onChangeText={(text) => searchPronoun(text)}
              autoCorrect={false}
              editable={ selected.length ===  4 ? false : true }
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'black' }} />
          </View>
          {pronoun.map((pr) => (
            <View pr={pr} key={pr.id} >
              { search ? 
                <Pressable onPress={() => {setSelected((arr) => [...arr, {id: pr.id, pronoun: pr.pronoun}]); setSearch('')}} pr={pr} key={pr.id} style={{ borderBottomWidth: 1, borderBottomColor: 'black', paddingVertical: 10 }}>
                  <Text pr={pr}>{pr.pronoun}</Text>
                </Pressable> : null
              }
            </View>
          ))}
        </View>
        { search ? null :
          <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingVertical: 10 }}>
              <Text style={{ color: '#393939', fontWeight: 'normal', textAlign: 'justify' }} >Add up to 4 pronouns to your profile so people know how to refer to you. You can edit or remove them at any time.</Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Show to Followers Only</Text>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Switch thumbColor='white' trackColor={{ false : '#d3d3d3', true: '#2e64e5'}}></Switch>
                </View>
              </View>
              <Text style={{ color: '#393939', fontWeight: 'normal', textAlign: 'justify' }} >When this is turned on, only people who follow you will see your pronouns.</Text>
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}

const SelectedItems = ({item, onDelete}) => {
  return(
    <Pressable item={item} onPress={() => onDelete(item.id)} style={{ flexDirection : 'row', alignItems: 'center', justifyContent: 'center', padding: 5, backgroundColor: 'white', borderWidth: 1, borderColor: '#d3d3d3', borderRadius: 3, marginRight: 5 }}>
      <Text>{item.pronoun}{' '}</Text>
      <Image style={{ width: 12, height: 12 }} source={require('../assets/icons/close.png')} />
    </Pressable>
  )
}

export default MimicInstagramMultiSelect
