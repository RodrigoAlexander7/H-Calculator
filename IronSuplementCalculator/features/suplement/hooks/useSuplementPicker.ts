import { Suplement, suplementSchema } from "@/features/suplement/dto/suplement.dto";
import suplement_information from "@/utils/json/suplement_information.json";
import { useEffect, useState } from "react";

const suplementItemsAux: Suplement[] = suplementSchema.array().parse(suplement_information);
const suplementItems = suplementItemsAux.map((item) => ({
    label: item.name,
    value: item.idSuplement,
}));

export const useSuplementPicker = () => {
    const [idSuplement, setIdSuplement] = useState<string>('');
    const [suplement, setSuplement] = useState<Suplement | null>(null);

    useEffect(() => {
        if (idSuplement) {
         // finding the Suplement object with this id
            const selectedSuplement = suplementItemsAux.find(item => item.idSuplement === idSuplement);
            
            if (selectedSuplement) {
                setSuplement(selectedSuplement);// update suplement
            } else {
                setSuplement(null); 
            }
        } else {
            setSuplement(null); // clear the state if there isn't suplement
        }
    }, [idSuplement]); // we do it if idSuplement change

    return {
        idSuplement,
        setIdSuplement,
        suplement,
        suplementItems,
    };
};