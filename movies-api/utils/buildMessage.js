function getOptionsMessage({ tags } = {}) {
  return tags && tags.length ? `with tags: ${tags.join(", ")}` : "";
}

function buildMessage(entity, action, options) {
  const optionsMessage = getOptionsMessage(options);

  if (action === "list") {
    return `${entity}s ${action}ed ${optionsMessage}`.trim();
  }

  return `${entity} ${action}d ${optionsMessage}`.trim();
}

module.exports = buildMessage;
