import {create} from "zustand"



type VehicleState = {
    vehicleName: string;
    setVehicleName: (vehicleName: string) => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
    vehicleName: "Scripted Vehicle",
    setVehicleName: (vehicleName) => set({ vehicleName }),
}));