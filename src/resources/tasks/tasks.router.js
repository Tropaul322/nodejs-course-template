const router = require('express').Router({ mergeParams: true });
const taskService = require('./tasks.service');
const { logger } = require('../../common/logger');

router.route('/').get(async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const tasks = await taskService.getAll(boardId);
    res.status(200).json(tasks);
  } catch (e) {
    logger.error('error', e.stack);
  }
});
router.route('/:id').get(async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const taskID = req.params.id;
    const task = await taskService.getTask(boardId, taskID);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).send('cannot find task');
    }
  } catch (e) {
    logger.error('error', e.stack);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const task = await taskService.postTask(boardId, req.body);
    res.status(200).json(task);
  } catch (e) {
    logger.error('error', e.stack);
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const taskID = req.params.id;
    const body = req.body;
    const task = await taskService.changeTask(boardId, taskID, body);
    if (task) {
      res.status(200).json(task);
    } else res.status(404).json({});
  } catch (e) {
    logger.error('error', e.stack);
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const taskID = req.params.id;
    const deleted = await taskService.deleteTask(boardId, taskID);
    if (deleted) {
      res.status(204).json([]);
    } else res.status(404).json({});
  } catch (e) {
    logger.error('error', e.stack);
  }
});
module.exports = router;
