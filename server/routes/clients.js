const express = require('express');
const { getSupabaseClient } = require('../db/supabaseClient');
const { validateCreateTaskPayload } = require('../middleware/validation');

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

router.post('/clients', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: 'Database client not configured' });
    }

    const { company_name, country, entity_type } = req.body;
    
    if (!company_name?.trim() || !country?.trim() || !entity_type?.trim()) {
      return res.status(400).json({ error: 'company_name, country, and entity_type are required fields.' });
    }

    const payload = {
      company_name: company_name.trim(),
      country: country.trim(),
      entity_type: entity_type.trim()
    };

    const { data, error } = await supabase
      .from('clients')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
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

router.post('/clients/:id/tasks', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: 'Database client not configured' });
    }

    const validationError = validateCreateTaskPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const clientId = req.params.id;
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

    const payload = {
      client_id: clientId,
      title: req.body.title.trim(),
      category: req.body.category,
      due_date: req.body.due_date,
      priority: req.body.priority,
      description: req.body.description ? req.body.description.trim() : null,
      status: 'Pending'
    };

    const { data, error } = await supabase
      .from('compliance_tasks')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
});

router.put('/clients/:id', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return res.status(500).json({ error: 'Database client not configured' });

    const clientId = req.params.id;
    const { company_name, country, entity_type } = req.body;
    const updates = { company_name, country, entity_type };

    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', clientId)
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } catch (error) { return next(error); }
});

router.delete('/clients/:id', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return res.status(500).json({ error: 'Database client not configured' });

    const clientId = req.params.id;
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).send();
  } catch (error) { return next(error); }
});

module.exports = router;
