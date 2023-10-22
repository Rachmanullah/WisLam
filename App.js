import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
    ImagesKawahBromo,
} from './src/assets';
import { Star1, SearchNormal, Location, BucketSquare } from 'iconsax-react-native';
import colors from './src/theme/colors';

const SearchComponent = () => {
    return (
        <View style={SearchStyle.container}>
            <View style={SearchStyle.input}>
                <SearchNormal size="20" color="#565e56" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#565e56"
                    style={SearchStyle.textInput}
                />
            </View>
            <TouchableOpacity style={SearchStyle.button}>
                <SearchNormal size="20" color="#FEFEFE" />
            </TouchableOpacity>
        </View>
    );
};

const CategoryList = () => {
    return (
        <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
            <View style={category.card}>
                <Text style={category.titleCard}>Mountain</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Beach</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Island</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Sea</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Forest</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Lakes</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Waterfall</Text>
            </View>
            <View style={category.card}>
                <Text style={category.titleCard}>Crater</Text>
            </View>
        </ScrollView>
    )
}

const RecommendList = () => {
    return (
        <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
            <View style={recommend.card}>
                <Image source={ImagesKawahBromo} style={recommend.CardImage} />
                <View style={recommend.cardContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={recommend.cardTitle}>Bromo</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                        <Location size="15" color="#697689" variant="Bold" />
                        <Text style={recommend.destination}>Pasuruan</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Star1 size={20} color='#dce775' variant='Bold' />
                            <Text style={recommend.rating}>4.5</Text>
                        </View>
                        <Star1 size={25} color='#dce775' />
                    </View>
                </View>
            </View>
            <View style={recommend.card}>
                <Image source={{ uri: 'https://th.bing.com/th/id/OIP.DlKBy4rsZBFxfkNx41wQewAAAA?pid=ImgDet&rs=1' }} style={recommend.CardImage} />
                <View style={recommend.cardContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={recommend.cardTitle}>Labuan Bajo</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                        <Location size="15" color="#697689" variant="Bold" />
                        <Text style={recommend.destination}>NTT</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Star1 size={20} color='#dce775' variant='Bold' />
                            <Text style={recommend.rating}>4.5</Text>
                        </View>
                        <Star1 size={25} color='#dce775' />
                    </View>
                </View>
            </View>
            <View style={recommend.card}>
                <Image source={{ uri: 'https://cdn0-production-assets-kly.akamaized.net/medias/1005298/big/078176700_1443602274-7.jpg' }} style={recommend.CardImage} />
                <View style={recommend.cardContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={recommend.cardTitle}>Pantai Pandawa</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                        <Location size="15" color="#697689" variant="Bold" />
                        <Text style={recommend.destination}>Kuta, Bali</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Star1 size={20} color='#dce775' variant='Bold' />
                            <Text style={recommend.rating}>4.5</Text>
                        </View>
                        <Star1 size={25} color='#dce775' />
                    </View>
                </View>
            </View>
            <View style={recommend.card}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628071160/blog/o1zz8bojecviivci4isw.webp' }} style={recommend.CardImage} />
                <View style={recommend.cardContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={recommend.cardTitle}>Diamond Beach</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                        <Location size="15" color="#697689" variant="Bold" />
                        <Text style={recommend.destination}>Nusa Penida</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Star1 size={20} color='#dce775' variant='Bold' />
                            <Text style={recommend.rating}>4.5</Text>
                        </View>
                        <Star1 size={25} color='#dce775' />
                    </View>
                </View>
            </View>
            <View style={recommend.card}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628089070/blog/wzf9irgne508ytlxl8ra.webp' }} style={recommend.CardImage} />
                <View style={recommend.cardContent}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={recommend.cardTitle}> Raja Ampat</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center', marginVertical: 10 }}>
                        <Location size="15" color="#697689" variant="Bold" />
                        <Text style={recommend.destination}>Papua Barat</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Star1 size={20} color='#dce775' variant='Bold' />
                            <Text style={recommend.rating}>4.5</Text>
                        </View>
                        <Star1 size={25} color='#dce775' />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const TravelStoriesList = () => {
    return (
        <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
            <View style={stories.container}>
                <ImageBackground source={{ uri: 'https://th.bing.com/th/id/OIP.1O7ovl6f7RnfwSL4tVWgDwHaJQ?pid=ImgDet&rs=1' }} style={stories.image}>
                    <View style={stories.content}>
                        <View style={stories.info}>
                            <Text style={{ ...stories.title, paddingVertical: 20 }}>Rachmanullah</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={stories.container}>
                <ImageBackground source={{ uri: 'https://th.bing.com/th/id/OIP.USKjhPKnAl8r6eXNjb4jOQHaE8?pid=ImgDet&rs=1' }} style={stories.image}>
                    <View style={stories.content}>
                        <View style={stories.info}>
                            <Text style={{ ...stories.title, paddingVertical: 20 }}>Rizki Iman</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={stories.container}>
                <ImageBackground source={{ uri: 'https://1.bp.blogspot.com/-NcDKlunO1JQ/WP4XIK_4lRI/AAAAAAAAAvA/nRvPEKHhF88OJLmLUVuh3b_FoMf42l8MACLcB/s1600/%2540alifaifa48%2Batgs.jpg' }} style={stories.image}>
                    <View style={stories.content}>
                        <View style={stories.info}>
                            <Text style={{ ...stories.title, paddingVertical: 20 }}>Yohanes</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={stories.container}>
                <ImageBackground source={{ uri: 'https://sgp1.digitaloceanspaces.com/tz-mag-id/wp-content/uploads/2018/03/101003031919/2-1-Paropo-By-ryo_rebi.jpg' }} style={stories.image}>
                    <View style={stories.content}>
                        <View style={stories.info}>
                            <Text style={{ ...stories.title, paddingVertical: 20 }}>Ipin</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={stories.container}>
                <ImageBackground source={{ uri: 'https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1638352380-desa-pinggan--bangli--bali-c-jpg-medium.jpg' }} style={stories.image}>
                    <View style={stories.content}>
                        <View style={stories.info}>
                            <Text style={{ ...stories.title, paddingVertical: 20 }}>Firman</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

const PopularList = () => {
    return (
        <View style={{ gap: 15 }}>
            <View style={popularStyle.container}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628090528/blog/g7dm4exggwo90xcemgks.webp' }} style={popularStyle.cardImage} />
                <View style={popularStyle.content}>
                    <Text style={popularStyle.category}>Sea</Text>
                    <Text style={popularStyle.title}>Taman Laut Bunaken</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Location size="18" color="#697689" variant="Bold" />
                        <Text style={popularStyle.location}>Sulawesi Utara</Text>
                    </View>
                </View>
            </View>
            <View style={popularStyle.container}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628091203/blog/uj2cfa7wwjcrdxfcglnl.webp' }} style={popularStyle.cardImage} />
                <View style={popularStyle.content}>
                    <Text style={popularStyle.category}>Beach</Text>
                    <Text style={popularStyle.title}>Pantai Ngurtafur</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Location size="18" color="#697689" variant="Bold" />
                        <Text style={popularStyle.location}>Maluku</Text>
                    </View>
                </View>
            </View>
            <View style={popularStyle.container}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628091741/blog/hnl0hmwflyi93uhzezsz.webp' }} style={popularStyle.cardImage} />
                <View style={popularStyle.content}>
                    <Text style={popularStyle.category}>Island</Text>
                    <Text style={popularStyle.title}>Kepulauan Derawan</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Location size="18" color="#697689" variant="Bold" />
                        <Text style={popularStyle.location}>Kalimantan Timur</Text>
                    </View>
                </View>
            </View>
            <View style={popularStyle.container}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628088251/blog/umocgtfo7o6tlv8fb68g.webp' }} style={popularStyle.cardImage} />
                <View style={popularStyle.content}>
                    <Text style={popularStyle.category}>Crater</Text>
                    <Text style={popularStyle.title}>Kawah Ijen</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Location size="18" color="#697689" variant="Bold" />
                        <Text style={popularStyle.location}>Bondowoso</Text>
                    </View>
                </View>
            </View>
            <View style={popularStyle.container}>
                <Image source={{ uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1628088388/blog/pfdv3npsrg5z7ugmuwhq.webp' }} style={popularStyle.cardImage} />
                <View style={popularStyle.content}>
                    <Text style={popularStyle.category}>Waterfall</Text>
                    <Text style={popularStyle.title}>Air Terjun Leke-leke</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Location size="18" color="#697689" variant="Bold" />
                        <Text style={popularStyle.location}>Bali</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const App = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topBars}>
                <View style={styles.location}>
                    <Text style={styles.titleCurrent}>Current Location</Text>
                    <Text style={styles.titleUserLocation}>Malang, IDN</Text>
                </View>
                <View style={styles.theme}>
                    <BucketSquare size="35" color="#555555" variant="Bold" />
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={styles.label}>Wonderful Indonesia</Text>
                <Text style={styles.label}>Let’s Explore Together </Text>
                <SearchComponent />
                <CategoryList />
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Recommend
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: colors.sekunder,
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>
                        View All
                    </Text>
                </View>
                <RecommendList />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Travel Story
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: colors.sekunder,
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>
                        View All
                    </Text>
                </View>
                <TravelStoriesList />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                    }}>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: 'black',
                            fontSize: 20,
                            paddingVertical: 10,
                        }}>
                        Popular
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'DavidLibre-Bold',
                            color: colors.sekunder,
                            fontSize: 16,
                            paddingVertical: 10,
                        }}>
                        View All
                    </Text>
                </View>
                <PopularList />
            </View>
        </ScrollView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    topBars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 10,
        padding: 5,
    },
    location: {
        padding: 10,
    },
    titleCurrent: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 12,
        color: 'black',
    },
    titleUserLocation: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 18,
        color: 'black',
    },
    theme: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ImagesProfile: {
        width: 40,
        height: 40,
    },
    label: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 25,
        color: 'black',
    },
});

const category = StyleSheet.create({
    card: {
        width: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        borderColor: colors.sekunder,
        borderWidth: 2,
        shadowColor: 'black',
        elevation: 5
    },
    titleCard: {
        color: 'black'
    }
})

const recommend = StyleSheet.create({
    card: {
        width: 150,
        backgroundColor: 'white',
        height: 200,
        elevation: 7,
        shadowColor: 'black',
        borderRadius: 20,
        marginBottom: 10
    },
    CardImage: {
        width: '100%',
        height: 100,
        borderRadius: 15,
    },
    cardContent: {
        justifyContent: 'space-between',
        padding: 10,
    },
    cardTitle: {
        color: 'black',
        fontFamily: 'DavidLibre-Bold',
        fontSize: 15,
    },
    destination: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Light',
        fontWeight: '600',
        fontSize: 13
    },
    cardIcon: {
        backgroundColor: 'white',
        padding: 5,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
    },
    rating: {
        color: 'black',
        fontFamily: 'Inter-ExtraBold'
    }
});

const SearchStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 15,
        gap: 10,
    },
    input: {
        backgroundColor: 'white',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        shadowColor: 'black',
        elevation: 5,
        height: 50,
    },
    textInput: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
    },
    button: {
        backgroundColor: colors.sekunder,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: 'black',
    },
});

const stories = StyleSheet.create({
    container: {
        width: 120,
        height: 150,
        borderRadius: 20,
        elevation: 10,
        shadowColor: 'black',

    },
    image: {
        width: '100%',
        height: '100%',

    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        justifyContent: 'flex-end',
        height: '100%',
        gap: 10,
        width: '100%',
    },
    title: {
        color: 'white',
        fontFamily: 'Stylish-Regular',
        fontSize: 18,
        padding: 5,
        backgroundColor: colors.darkModeBlack(0.50),
    }
})

const popularStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 20,
        flexDirection: 'row',
    },
    cardImage: {
        borderRadius: 20,
        width: 90,
        height: 90,
        objectFit: 'cover'
    },
    content: {
        margin: 10,
    },
    category: {
        color: colors.sekunder,
        fontFamily: 'DavidLibre-Bold',
        fontSize: 13
    },
    title: {
        color: 'black',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 18,
        fontWeight: '500'
    },
    location: {
        color: 'grey',
        fontSize: 13,
    }
})
