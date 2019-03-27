# -*- coding: utf-8 -*-

from odoo import api, fields, models, _
from odoo.exceptions import UserError


class Approve(models.TransientModel):
    """审核"""
    _name = 'gesion_dms.task.stage.approve'

    task_stage_ids = fields.Many2many('task.stage', 'approve_stage_rel', 'approve_id', 'stage_id')
    title = fields.Char(string='Title', track_visibility='always')
    remarks = fields.Text(string='Opinion', track_visibility='always')

    def base(self):
        model_data = self.env['ir.model.data']
        model_self = super(Approve, self).read(['title', 'remarks'])[0]
        vals = {}
        vals['task_stage_id'] = self._context.get('task_stage_id')
        vals['title'] = model_self['title']
        vals['remarks'] = model_self['remarks']
        vals['addperson'] = self.env.user.id
        vals['adddate'] = fields.Datetime.now()
        vals['status'] = '0'
        return self.env['approve.info'].create(vals)

    def agree(self):
        Approve.base(self)
        task_stage_id = self._context.get('task_stage_id')
        common = self.env['task.stage'].browse(task_stage_id)
        self._cr.execute('select state from task_stage where id =%s', (task_stage_id,))
        res = self._cr.fetchone()
        state = res[0].encode('utf-8')

        self._cr.execute('select task_id from task_stage where id =%s', (task_stage_id,))
        res1 = self._cr.fetchone()
        print(res1)

        self._cr.execute('select id from task_stage where task_id =%s', (res1,))
        # res2 = self._cr.fetchall()
        # for index in len(res2):
        #     for tuple in res2:
        #         if

        if state == 'draft':
            common.write({'state': 'checked', 'approve_id': self.id, 'commit_datetime': fields.Datetime.now()})
        elif state == 'checked':
            common.write({'state': 'approved', 'approve_id': self.id})
        else:
            common.write({'state': 'done', 'approve_id': self.id})

    def refuse(self):
        Approve.base(self)
        task_stage_id = self._context.get('task_stage_id')
        common = self.env['task.stage'].browse(task_stage_id)
        self._cr.execute('select state from task_stage where id =%s', (task_stage_id,))
        res = self._cr.fetchone()
        state = res[0].encode('utf-8')
        if state == 'checked':
            common.write({'state': 'draft', 'approve_id': self.id})
        elif state == 'approved':
            common.write({'state': 'checked', 'approve_id': self.id})
