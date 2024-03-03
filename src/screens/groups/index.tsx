import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import { Container } from './styles';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';

export function Groups() {

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([]);

    const navigation = useNavigation();

    const handleNewGroup = () => {
        navigation.navigate('New');
    }

    const fetchGroups = async () => {
        try {
            setIsLoading(true);

            const data = await groupsGetAll();
            setGroups(data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleOpenPlayers = (group: string) => {
        navigation.navigate('Players', { group })
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

    return (
        <Container>
            <Header />

            <Highlight
                title='Turmas'
                subtitle='Jogue com a sua turma'
            />

            {
                isLoading ? <Loading /> :
                    <FlatList
                        data={groups}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <GroupCard
                                title={item}
                                onPress={() => handleOpenPlayers(item)}
                            />
                        )}
                        contentContainerStyle={groups.length === 0 && { flex: 1 }}
                        ListEmptyComponent={() => (
                            <ListEmpty
                                message='Cadastre a sua primeira turma'
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
            }

            <Button
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}