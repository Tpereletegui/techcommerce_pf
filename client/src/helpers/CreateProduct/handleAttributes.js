export const handleAttributes = (e, attributes, setAttributes) => {
  setAttributes({
    ...attributes,
    [e.target.name === "name" ? "name" : "value"]: e.target.value,
  });
};

export const addAttribute = (attributes, input, setInput) => {
  if (!input.attributes?.find((a) => a.name === attributes.name)) {
    setInput({ ...input, attributes: [...input.attributes, attributes] });
  } else {
    alert("This attribute already exist");
  }
};

export const removeAttributes = (input, setInput, name) => {
  setInput({
    ...input,
    attributes: input.attributes.filter((a) => a.name !== name),
  });
};
