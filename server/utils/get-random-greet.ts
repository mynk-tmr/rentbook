export function getRandomGreet() {
  const messages = ["Hello", "Hi", "Hey", "Hi there", "Hey there"];
  return "Bun says " + messages[Math.floor(Math.random() * messages.length)];
}
