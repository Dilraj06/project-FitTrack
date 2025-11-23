import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FitTrack API',
      version: '1.0.0',
      description: 'Fitness & Workout Tracking API'
    },
    servers: [
      { url: 'http://localhost:4000/api', description: 'Local development server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Exercise: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            muscles: { type: 'array', items: { type: 'string' } },
            difficulty: { type: 'string', enum: ['easy','medium','hard'] },
            mediaUrl: { type: 'string', format: 'uri' },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['name']
        },
        WorkoutExerciseItem: {
          type: 'object',
          properties: {
            exerciseId: { type: 'string' },
            order: { type: 'integer' },
            reps: { type: 'integer' },
            sets: { type: 'integer' },
            restSeconds: { type: 'integer' }
          },
          required: ['exerciseId']
        },
        Workout: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            creatorId: { type: 'string' },
            exercises: {
              type: 'array',
              items: { $ref: '#/components/schemas/WorkoutExerciseItem' }
            },
            visibility: { type: 'string', enum: ['public','private'] },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['title','creatorId','exercises']
        },
        TrainerProfile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            bio: { type: 'string' },
            specialties: { type: 'array', items: { type: 'string' } },
            clients: { type: 'array', items: { type: 'string' } },
            mediaUrl: { type: 'string', format: 'uri' },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['id']
        },
        Client: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            name: { type: 'string' },
            age: { type: 'integer' },
            heightCm: { type: 'number' },
            weightKg: { type: 'number' },
            goals: { type: 'array', items: { type: 'string' } },
            assignedTrainerId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['userId','name']
        }
      },
      examples: {
        ExerciseExample: {
          summary: 'Push Up example',
          value: {
            name: 'Push Up',
            description: 'Bodyweight chest & triceps exercise',
            muscles: ['chest','triceps'],
            difficulty: 'easy',
            mediaUrl: 'file:///mnt/data/Screenshot 2025-11-22 at 5.03.56 PM.png'
          }
        },
        WorkoutExample: {
          summary: 'Starter workout',
          value: {
            title: 'Full Body Starter',
            description: 'Beginner routine',
            creatorId: 'user_12345',
            exercises: [
              { exerciseId: 'ex_pushup123', order: 1, reps: 12, sets: 3, restSeconds: 60 }
            ],
            visibility: 'public'
          }
        },
        TrainerExample: {
          summary: 'Trainer profile example',
          value: {
            id: 'trainer_001',
            bio: 'Certified trainer',
            specialties: ['strength'],
            clients: [],
            mediaUrl: 'file:///mnt/data/Screenshot 2025-11-22 at 5.03.56 PM.png'
          }
        },
        ClientExample: {
          summary: 'Client example',
          value: {
            userId: 'user_500',
            name: 'Aman Singh',
            age: 27,
            heightCm: 178,
            weightKg: 72,
            goals: ['build muscle'],
            assignedTrainerId: null
          }
        }
      }
    }
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
  ]
};

const spec = swaggerJSDoc(options);

export default spec;
