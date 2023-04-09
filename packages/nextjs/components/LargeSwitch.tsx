import cls from 'classnames';

interface ISwitchProps<Option extends string> {
  selected?: Option;
  setSelected?: (selected: Option) => void;
  options: readonly Option[];
}

export default function Switch<T extends string>({ selected, setSelected, options }: ISwitchProps<T>) {
  return (
    <div className="w-full border-2 border-accent rounded-full p-1 bg-base-100">
      {options.map((option: T) => (
        <button
          key={option}
          className={cls(
            "tab tab-lg w-1/2",
            selected === option && 'btn'
          )}
          onClick={() => setSelected?.(option as T)}
        >
          <span className={selected === option ? 'text-accent' : 'text-neutral-500'}>{option}</span>
        </button>
      ))}
    </div>
  );
}
