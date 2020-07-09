import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Milliseconds from epoch */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  heartBeat?: Maybe<Scalars['Timestamp']>;
  getWeatherForLocation?: Maybe<Weather>;
  getMetrics?: Maybe<Array<Maybe<Scalars['String']>>>;
  getLastKnownMeasurement?: Maybe<Measurement>;
  getMeasurements?: Maybe<Array<Maybe<Measurement>>>;
  getMultipleMeasurements?: Maybe<Array<Maybe<MultipleMeasurements>>>;
};

export type QueryGetWeatherForLocationArgs = {
  latLong: WeatherQuery;
};

export type QueryGetLastKnownMeasurementArgs = {
  metricName: Scalars['String'];
};

export type QueryGetMeasurementsArgs = {
  input?: Maybe<MeasurementQuery>;
};

export type QueryGetMultipleMeasurementsArgs = {
  input?: Maybe<Array<Maybe<MeasurementQuery>>>;
};

export type WeatherQuery = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Used in sample, tells the weather at a requested position (lng/lat) */
export type Weather = {
  __typename?: 'Weather';
  description: Scalars['String'];
  locationName: Scalars['String'];
  temperatureinCelsius: Scalars['Float'];
};

/** Basic unit of measurement. The measurement of a metric, at a time, which has a value and a unit */
export type Measurement = {
  __typename?: 'Measurement';
  metric: Scalars['String'];
  at: Scalars['Timestamp'];
  value: Scalars['Float'];
  unit: Scalars['String'];
};

/** How to specify the range you want to receive measurements for */
export type MeasurementQuery = {
  /** Name of metric, like casingPressure */
  metricName: Scalars['String'];
  /** Optional, defaults to system startup time */
  after?: Maybe<Scalars['Timestamp']>;
  /** Optional, defaults to now */
  before?: Maybe<Scalars['Timestamp']>;
};

export type MultipleMeasurements = {
  __typename?: 'MultipleMeasurements';
  metric: Scalars['String'];
  measurements?: Maybe<Array<Maybe<Measurement>>>;
};

/** Invoked whenever a new measurement is received and published. Useful for realtime apps */
export type Subscription = {
  __typename?: 'Subscription';
  newMeasurement?: Maybe<Measurement>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  WeatherQuery: WeatherQuery;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Weather: ResolverTypeWrapper<Weather>;
  Measurement: ResolverTypeWrapper<Measurement>;
  MeasurementQuery: MeasurementQuery;
  MultipleMeasurements: ResolverTypeWrapper<MultipleMeasurements>;
  Subscription: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Timestamp: Scalars['Timestamp'];
  WeatherQuery: WeatherQuery;
  Float: Scalars['Float'];
  Weather: Weather;
  Measurement: Measurement;
  MeasurementQuery: MeasurementQuery;
  MultipleMeasurements: MultipleMeasurements;
  Subscription: {};
  Upload: Scalars['Upload'];
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  heartBeat?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  getWeatherForLocation?: Resolver<
    Maybe<ResolversTypes['Weather']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetWeatherForLocationArgs, 'latLong'>
  >;
  getMetrics?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  getLastKnownMeasurement?: Resolver<
    Maybe<ResolversTypes['Measurement']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLastKnownMeasurementArgs, 'metricName'>
  >;
  getMeasurements?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Measurement']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMeasurementsArgs, never>
  >;
  getMultipleMeasurements?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['MultipleMeasurements']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMultipleMeasurementsArgs, never>
  >;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type WeatherResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']
> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locationName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  temperatureinCelsius?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MeasurementResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Measurement'] = ResolversParentTypes['Measurement']
> = {
  metric?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  at?: Resolver<ResolversTypes['Timestamp'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  unit?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MultipleMeasurementsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MultipleMeasurements'] = ResolversParentTypes['MultipleMeasurements']
> = {
  metric?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  measurements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Measurement']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  newMeasurement?: SubscriptionResolver<
    Maybe<ResolversTypes['Measurement']>,
    'newMeasurement',
    ParentType,
    ContextType
  >;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  Weather?: WeatherResolvers<ContextType>;
  Measurement?: MeasurementResolvers<ContextType>;
  MultipleMeasurements?: MultipleMeasurementsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
