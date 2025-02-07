// 'use client';

// import {useTransition, ChangeEvent} from 'react';

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

//     function onChange(event: ChangeEvent<HTMLSelectElement>) {
//         const locale = event.target.value as Locale;
//         startTransition(() => {
//         });
//       }

//     return (
//         <select defaultValue={defaultValue} onChange={onChange}>
//             {items.map((item) => {
//                 return (
//                     <option key={item.value} value={item.value} >{label}</option>
//                 )
//             })}
//         </select>
//     )
// }