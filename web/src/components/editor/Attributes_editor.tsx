import { Container } from "@chakra-ui/react"
import { useHandlingStore } from "../../store/handlingStore"
import Handling from "./Handling"
import { useEffect, useState } from "react"
import { useVehicleStore } from "../../store/vehicleStore"
import React from "react"


const Attributes_editor: React.FC = () => {


  const {handlings} = useHandlingStore()
  const {vehicleName} = useVehicleStore()

  const [newAttributes, setNewAttributes] = useState<JSX.Element[]>([])
  
  
  useEffect(() => {
    console.log("Debug:Attributes_editor.tsx: Alleksan ta newAttributes --")
  }, [newAttributes])

  useEffect(() => {
    console.log("Debug:Attributes_editor.tsx: Alleksan ta handlings --")
  }, [handlings])
  
  useEffect(() => {
    console.log("Debug:Attributes_editor.tsx: Alleksan to vehicleName --", vehicleName)
  }, [vehicleName])
  

  
  useEffect(() => {
    console.log("Debug:Attributes_editor.tsx ---- Allaksan ta handlings kai paw gia setAttributes- LEITOURGIKO")

      const handlingAttributes = handlings.map(handling => (
        <li><Handling name={handling.name} value={handling.value} /></li>
      ));
      setNewAttributes([])
      setNewAttributes(handlingAttributes)
  } , [handlings])


  return (
    <Container overflow = 'auto' p={1} border={"solid"} borderWidth={2} borderRadius={2} borderColor={"gray.600"} scrollBehavior={"smooth"}
    sx={{
      /* Hide scrollbar for Chrome, Safari, Edge */
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }}> 
            <ul id = "attributes" style={{ listStyleType: "none", gap: "1rem",}}>{newAttributes}</ul>
    </Container>
  )
}

export default Attributes_editor


