# -*- coding: utf-8 -*-

from odoo import api, models, fields, _


class ProjectTaskStage(models.Model):
    _inherit = 'project.task.type'

    std = fields.Float(string='STD%')
    issued = fields.Boolean(string='Issued')
    planned_date = fields.Date(string='Planned Date')
    forcast_date = fields.Date(string='Forcast Date')
    actual_date = fields.Date(string='Actual Date')
    milestone = fields.Many2one('milestone', string='Milestone')


