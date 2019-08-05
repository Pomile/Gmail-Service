function buildMessage(from, to, subject, message) {
  const str = [
    'Content-type: text/html;charset=iso-8859-1\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'to: ', to, '\n',
    'from: ', from, '\n',
    'subject: ', subject, '\n\n',
    `${message}`,
  ].join('');
  // Compose Gmail message and send immediately
  return str;
}

export default buildMessage;
