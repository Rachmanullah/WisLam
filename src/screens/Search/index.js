import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SearchNormal, DocumentFilter } from 'iconsax-react-native'
import { PopularList } from '../../component';
import { DataWisata } from '../../../data';

const SearchScreen = () => {
    const DataAcak = DataWisata.sort(() => Math.random());
    const DataRender = DataAcak.slice(0, 3)
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.search}>
                    <SearchNormal size={25} color='#697689' />
                    <TextInput placeholder='Search Destination' style={styles.input} placeholderTextColor="#565e56" />
                </View>
                <TouchableOpacity style={{ backgroundColor: '#ff8a65', width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <DocumentFilter size="32" color="#FEFEFE" />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: 'black', marginBottom: 10 }}>search result</Text>
                {
                    <View style={{ gap: 15 }}>
                        {
                            DataRender.map((item, index) => (
                                <PopularList data={item} key={index} />
                            ))
                        }
                    </View>
                }
            </View>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE'
    },
    box: {
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    search: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#FEFEFE',
        elevation: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        width: 250,
    },
    input: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        width: 200,
    }
})