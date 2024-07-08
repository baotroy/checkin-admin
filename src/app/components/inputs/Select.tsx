// import ReactSelect from "react-select";
// interface SelectProps {
//   label: string;
//   value?: Record<string, any>;
//   onChange: (value: Record<string, any>) => void;
//   options: Record<string, any>[];
//   disabled?: boolean;
// }

// const Select: React.FC<SelectProps> = ({
//   label,
//   value,
//   onChange,
//   options,
//   disabled,
// }) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <div className="mt-2">
//         <ReactSelect
//           isDisabled={disabled}
//           value={value}
//           isMulti
//           onChange={onChange}
//           options={options}
//           menuPortalTarget={document.body}
//           styles={{
//             menuPortal: (base) => ({
//               ...base,
//               zIndex: 9999,
//             }),
//           }}
//           classNames={{
//             control: () => "text-sm",
//           }}
//         ></ReactSelect>
//       </div>
//     </div>
//   );
// };

// export default Select;
