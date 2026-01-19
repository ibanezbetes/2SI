import React from "react";
import { Image, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../constants/mock";
interface Props{
    card: {
        title: string;
        location: string;
        price: string;
        rating: number;
        image: string;
    }
}

export default function ListingCard({ card }: Props) {
    return(
        <View style={styles.card}>
            <Text style={styles.title}>{card.title}</Text>
            <Text style={styles.location}>{card.location}</Text>
            <Text style={styles.price}>{card.price}</Text>
            <Text style={styles.rating}>{card.rating}</Text>
            <Image source={{ uri: card.image }} style={styles.image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10, 
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: COLORS.lightGrey,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: COLORS.dark,
    
    },
    location: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        marginBottom: 5,
    },
    rating: {
        fontSize: 16,
        marginBottom: 5,
    }
});