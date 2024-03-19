export function reSetValues(setters) {
    setters.forEach(setter => setter(""));
}