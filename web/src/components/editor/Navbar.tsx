import { Text, Container } from '@chakra-ui/react'
function Navbar() {
    
    return (
        <Container p={4} textAlign={"center"}>
                <Text
                    as={"i"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                    fontFamily={"Brush Script MT"}
                    color={"gray.200"}
                >Handling Editor by JC</Text>
        </Container>  
        )
    
}

export default Navbar
