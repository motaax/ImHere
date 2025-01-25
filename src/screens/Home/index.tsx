import React, {useState} from "react"
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert} from "react-native"

import { Participant } from "../../components/Participant"

import { styles } from "./styles"

export default function Home(){

    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState("")

    function handleParticipantAdd(){
      if(participants.includes(participantName)) {
        return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.")
      }

      setParticipants(prevState => [...prevState, participantName])
      setParticipantName("")

    }

    function handleParticipantRemove(name: string){

      setParticipants(prevState => prevState.filter(participant => participant !== name))

      Alert.alert("Remover", `Remover o participante ${name}?`, [
        {
          text: "Sim",
          onPress: () => Alert.alert("Deletado!")
        },
        {
          text: "Não",
          style: "cancel"
        }
      ])
    }

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
        </Text>

      <Text style={styles.eventDate}>
        Sábado, 25 de Janeiro de 2025
        </Text>

        <View style={styles.form}>
            <TextInput
            style={styles.input} 
            placeholder="Nome do participante"
            placeholderTextColor="#6B6B6B"
            onChangeText={setParticipantName}
            value={participantName}
            />

            <TouchableOpacity style={styles.button} onPress={handleParticipantAdd} activeOpacity={0.5}>
                <Text style={styles.buttonText}>
                  +
                </Text> 
            </TouchableOpacity>
        </View>

        <FlatList data={participants} keyExtractor={item => item} renderItem={({item}) => (
          <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)}/>
        )} showsVerticalScrollIndicator={false}  ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        )}/>

    </View>
  )
}