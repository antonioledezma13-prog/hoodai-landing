const router    = require('express').Router();
const rateLimit = require('express-rate-limit');
const Lead      = require('../models/Lead');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: { error: 'Demasiados intentos. Espera 15 minutos.' },
});

// POST /api/leads
router.post('/', limiter, async (req, res) => {
  try {
    const { email, plan = 'free' } = req.body;

    if (!email || !email.includes('@') || email.length > 254)
      return res.status(400).json({ error: 'Email inválido.' });

    const exists = await Lead.findOne({ email: email.toLowerCase().trim() });
    if (exists)
      return res.status(409).json({ error: 'Este email ya está registrado. ¡Te avisaremos pronto!' });

    await Lead.create({
      email: email.toLowerCase().trim(),
      plan,
      ip: req.ip,
    });

    res.json({ ok: true, message: '¡Registro exitoso! Te contactaremos pronto.' });

  } catch (e) {
    console.error('leads error:', e);
    res.status(500).json({ error: 'Error interno. Intenta de nuevo.' });
  }
});

// GET /api/leads/count — cuántos leads hay (sin exponer emails)
router.get('/count', async (req, res) => {
  try {
    const count = await Lead.countDocuments();
    res.json({ count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
