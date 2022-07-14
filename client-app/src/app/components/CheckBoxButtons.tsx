import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

// we are making here a reusable checkboxgroup if we want to have them
// in different parts of our applications

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void; // can be one or more
}

export default function CheckBoxButtons({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || []); // might be empty or undefined

    function handleChecked(value: string) {
        // when a user checks
        const currentIndex = checkedItems.findIndex((item) => item === value);
        let newChecked: string[] = []; // empty array initially

        // if we dont find any checked Item, add to the checked Items value
        if (currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter((item) => item !== value);
        // this gives us the list of checked items minus the ones that we are unchecking

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map((item) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                        />
                    }
                    label={item}
                    key={item}
                />
            ))}
        </FormGroup>
    );
}
