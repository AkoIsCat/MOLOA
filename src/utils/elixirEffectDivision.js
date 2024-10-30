export const elixirEffectDivision = (item, activate, number) => {
  const removeFontTagRegex = /<\/?FONT[^>]*>/g;
  if (number === 1) {
    const elixirEffect = activate
      ? item.tooltip[3]?.Elixir?.replace(removeFontTagRegex, '').split(
          /<br>|<BR>/s
        )
      : item.tooltip[4]?.Elixir?.replace(removeFontTagRegex, '').split(
          /<br>|<BR>/s
        );
    return elixirEffect;
  } else if (number === 2) {
    const elixirEffect = activate
      ? item.tooltip[3]?.Elixir2?.replace(removeFontTagRegex, '').split(
          /<br>|<BR>/s
        )
      : item.tooltip[4]?.Elixir2?.replace(removeFontTagRegex, '').split(
          /<br>|<BR>/s
        );
    return elixirEffect;
  }
};
