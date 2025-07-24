export function handleError(err, res) {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
}
