// 'use client';

// import {useTransition, ChangeEvent} from 'react';
// import { setUserLocale } from '../services/locale';

// type Props = {
//     defaultValue: string;
//     items: Array<{value: string; label: string}>;
//     label: string;
// };

// type Locale = "en" | "de";

// export default function LocaleSwitcherSelect({
//     defaultValue,
//     items,
//     label
//   }: Props) {

//     const [isPending, startTransition] = useTransition();

//     function handleChange(event: ChangeEvent<HTMLSelectElement>) {
//         const newLocale = event.target.value as Locale;
//         startTransition(() => {
//             setUserLocale(newLocale);
//         });
//       }

//     return (
//         <select defaultValue={defaultValue} onChange={handleChange}>
//             {items.map((item) => {
//                 return (
//                     <option key={item.value} value={item.value} >{label}</option>
//                 )
//             })}
//         </select>
//     )
// }