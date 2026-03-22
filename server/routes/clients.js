const express = require('express');
const { getSupabaseClient } = require('../db/supabaseClient');

const router = express.Router();

router.get('/clients', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: 'Database client not configured' });
    }

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('company_name', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data ?? []);
  } catch (error) {
    return next(error);
  }
});

router.get('/clients/:id/tasks', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: 'Database client not configured' });
    }

    const clientId = req.params.id;
    const status = req.query.status;
    const category = req.query.category;

    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('id', clientId)
      .maybeSingle();

    if (clientError) {
      return res.status(500).json({ error: clientError.message });
    }

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    let query = supabase
      .from('compliance_tasks')
      .select('*')
      .eq('client_id', clientId)
      .order('due_date', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data ?? []);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
