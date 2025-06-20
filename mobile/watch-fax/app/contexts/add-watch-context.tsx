import * as React from 'react';
import { createContext, Dispatch } from 'react';

interface IAddAWatchContextProps {
    brand?: string;
    setBrand?: Dispatch<React.SetStateAction<string | undefined>>;
    model?: string;
    setModel?: Dispatch<React.SetStateAction<string | undefined>>;
    referenceNumber?: string;
    setReferenceNumber?: Dispatch<React.SetStateAction<string | undefined>>;
    serialNumber?: string;
    setSerialNumber?: Dispatch<React.SetStateAction<string | undefined>>;
    productionYear?: number;
    setProductionYear?: Dispatch<React.SetStateAction<number | undefined>>;
    purchaseDate?: Date;
    setPurchaseDate?: Dispatch<React.SetStateAction<Date | undefined>>;
    price?: number | null;
    setPrice?: Dispatch<React.SetStateAction<number | null>>;
    hasPapers?: boolean;
    setHasPapers?: Dispatch<React.SetStateAction<boolean>>;
    hasOriginalBox?: boolean;
    setHasOriginalBox?: Dispatch<React.SetStateAction<boolean>>;
    hasRecordOfAuth?: boolean;
    setHasRecordOfAuth?: Dispatch<React.SetStateAction<boolean>>;
    condition?: string;
    setCondition?: Dispatch<React.SetStateAction<string | undefined>>;
    purchaseStory?: string;
    setPurchaseStory?: Dispatch<React.SetStateAction<string | undefined>>;
    watchImages?: string[];
    setWatchImages?: Dispatch<React.SetStateAction<string[]>>;
    clearAllInfo?: () => void;
}

const AddAWatchContext = createContext<IAddAWatchContextProps>({});

export const useAddAWatchContext = () => {
    return React.useContext(AddAWatchContext);
};

export const AddAWatchContextProvider = ({ children }: any) => {
    const [brand, setBrand] = React.useState<string>();
    const [referenceNumber, setReferenceNumber] = React.useState<string>();
    const [serialNumber, setSerialNumber] = React.useState<string>();
    const [model, setModel] = React.useState<string>();
    const [productionYear, setProductionYear] = React.useState<number>();
    const [purchaseDate, setPurchaseDate] = React.useState<Date>();
    const [price, setPrice] = React.useState<number | null>(0.0);
    const [hasPapers, setHasPapers] = React.useState<boolean>(false);
    const [hasOriginalBox, setHasOriginalBox] = React.useState<boolean>(false);
    const [hasRecordOfAuth, setHasRecordOfAuth] =
        React.useState<boolean>(false);
    const [condition, setCondition] = React.useState<string>();
    const [purchaseStory, setPurchaseStory] = React.useState<string>();
    const [watchImages, setWatchImages] = React.useState<string[]>([]);

    const value: IAddAWatchContextProps = {
        brand,
        setBrand,
        model,
        setModel,
        referenceNumber,
        setReferenceNumber,
        serialNumber,
        setSerialNumber,
        productionYear,
        setProductionYear,
        purchaseDate: purchaseDate, // convert Date to number
        setPurchaseDate: setPurchaseDate,
        price,
        setPrice,
        hasPapers,
        setHasPapers,
        hasOriginalBox,
        setHasOriginalBox,
        hasRecordOfAuth,
        setHasRecordOfAuth,
        condition,
        setCondition,
        purchaseStory,
        setPurchaseStory,
        watchImages,
        setWatchImages,
        clearAllInfo: () => {
            setBrand(undefined);
            setModel(undefined);
            setReferenceNumber(undefined);
            setSerialNumber(undefined);
            setPurchaseDate(undefined);
            setPrice(0.0);
            setHasPapers(false);
            setHasOriginalBox(false);
            setHasRecordOfAuth(false);
            setCondition(undefined);
            setPurchaseStory(undefined);
            setWatchImages([]);
        },
    };

    return (
        <AddAWatchContext.Provider value={value}>
            {children}
        </AddAWatchContext.Provider>
    );
};

export default AddAWatchContextProvider;
