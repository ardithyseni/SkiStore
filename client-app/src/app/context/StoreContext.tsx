/* We are going to make a component that we can wrap around
   the application and make the states and methods available
   anywhere in our application.
*/

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() { // custom react hook also start with use...
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Oops - we do not seem to be inside the provider');
    }

    return context;
} 


export function StoreProvider({children}: PropsWithChildren<any>) {
    
    // anything thats inside our store provider are gonna be children
    
    // here we are going to create our states
    // and our methods that we need

    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: number, quantity: number) {
        
        if (!basket) return;

        const items = [...basket.items]; // new copy of array and store it in 'items'
        
        // find the index of the product
        const itemIndex = items.findIndex(i => i.productId === productId);
        
        // findIndex kthen indexin ose -1 nese nuk e gjen, tash per mu kon defensive:

        if (itemIndex >= 0) {
            items[itemIndex].quantity -= quantity; // hekja quantity basketit per qaq sa parametri quantity
            
            if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1); // 1-1=0 heke prej liste
            
            setBasket(prevState => {
                return {...prevState!, items} // replace the prev state with new state items
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children} 
            {/* App.tsx */}
        </StoreContext.Provider>
    )
}