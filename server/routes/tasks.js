const express = require('express');
const { getSupabaseClient } = require('../db/supabaseClient');
const { validateStatusPayload } = require('../middleware/validation');

const router = express.Router();

router.patch('/tasks/:id/status', async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(500).json({ error: 'Database client not configured' });
    }

    const validationError = validateStatusPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const taskId = req.params.id;
    const nextStatus = req.body.status;

    const { data: task, error: taskError } = await supabase
      .from('compliance_tasks')
      .select('id')
      .eq('id', taskId)
      .maybeSingle();

    if (taskError) {
      return res.status(500).json({ error: taskError.message });
    }

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { data, error } = await supabase
      .from('compliance_tasks')
      .update({ status: nextStatus })
      .eq('id', taskId)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
