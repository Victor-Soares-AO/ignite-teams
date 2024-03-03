import { TouchableOpacityProps } from 'react-native';
import { Container, Title, filterStyleProps } from './styles';

type Props = TouchableOpacityProps & filterStyleProps & {
    title: string;
}

export function Filter({ title, isActive, ...rest }:Props){
    return(
        <Container
            isActive={isActive}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Container>
    )
}